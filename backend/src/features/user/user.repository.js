import { ApplicationError } from "../../error-handler/applicationError.js";
import user from './user.schema.js';
import bcrypt from 'bcrypt';
import blackListSchema from "./blacklist.schema.js";
import mongoose from 'mongoose';
import Cart from './cart.schema.js';
import Order from './order.schema.js';

const blacklist = mongoose.model('block',blackListSchema);

export default class UserRepository{

    static signup(name, email, password) {
        // Password validation
        if (
            typeof password !== 'string' ||
            password.length < 8 ||
            password.length > 25 ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            return Promise.reject(new ApplicationError('Password should be between 8-25 characters and have a special character', 400));
        }

        // Hash password before saving
        return bcrypt.hash(password, 12)
            .then(function (hashedPassword) {
                // Create new user
                var newUser = new user({ name: name, email: email, password: hashedPassword });

                return newUser.save();
            })
            .then(function (savedUser) {
                return savedUser; // Return the saved user
            })
            .catch(function (error) {
                if (error.code === 11000) { 
                    throw new ApplicationError("The email " + email + " is already registered.", 400);
                }
                console.error("Error in repository: ", error);
                throw error;
            });
    }

    static login(email, password) {
        return user.findOne({ email: email })
            .then(function (user) {
                if (!user) {
                    // Email does not exist in the database
                    throw new ApplicationError('User not found', 400);
                }
                // Compare the provided password with the hashed password in the database
                return bcrypt.compare(password, user.password)
                    .then(function (isMatch) {
                        if (isMatch) {
                            return user; 
                        } else {
                            throw new Error('Incorrect password');
                        }
                    });
            })
            .catch(function (err) {
                console.log('Error in signIn:', err.message);
                throw err; 
            });
    }

    static logout(token, expiryTime, userId, cart, orders) {
        console.log("Logout hit in Repo");
    
        if (!userId) {
            return new ApplicationError("User ID is required for logout.", 400);
        }
    
        // ✅ Save Cart (Ensure products contain `id`)
        if (cart.length > 0) {
            Cart.findOneAndUpdate(
                { userId },  
                { products: cart.map(item => ({ id: item.id, quantity: item.quantity })), updatedAt: new Date() },
                { upsert: true, new: true }
            )
            .then(savedCart => {
                console.log("Cart Saved:", savedCart);
            })
            .catch(error => {
                console.error("Error saving cart:", error);
            });
        }
    
        // ✅ Save Orders with `id` instead of `productId`
        if (orders.length > 0) {
            Order.insertMany(
                orders.map(order => ({
                    userId,
                    products: order.products.map(product => ({ 
                        id: product.id,  // ✅ Change `productId` to `id`
                        title: product.title,
                        quantity: product.quantity,
                        price: product.price
                    })),
                    totalPrice: order.totalPrice,
                    orderDate: order.date || new Date()
                }))
            )
            .then(savedOrders => console.log("Orders Saved:", savedOrders))
            .catch(error => console.error("Error saving orders:", error));
        }
    
        // ✅ Blacklist Token After Saving Data
        const blacklistEntry = new blacklist({ token, expiresAt: expiryTime });
    
        return blacklistEntry.save()
            .then(blacklistResult => {
                console.log("Token blacklisted:", blacklistResult);
                return { cart: "Saved", orders: "Saved", token: "Blacklisted" };
            })
            .catch(error => {
                console.error("Error blacklisting token:", error);
                return new ApplicationError("Failed to blacklist token.", 500);
            });
    }
    
}