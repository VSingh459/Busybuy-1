import { useValue } from "../../context/productContext";
import OrderTable from "../../components/OrderTable/OrderTable";
import "./Orders.css";

const OrdersPage = () => {
    const { orders } = useValue(); // ✅ Get latest orders from context

    console.log("Orders received in OrdersPage:", orders); // Debugging log

    return (
        <div>
            <h2>My Orders</h2>
            <OrderTable orders={orders || []} />  
        </div>
    );
};

export default OrdersPage;
