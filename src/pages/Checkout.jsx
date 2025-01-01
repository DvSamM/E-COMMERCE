import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    try {
      await addOrder({
        items: cart,
        total: total,
      });
      
      toast.success("Order placed successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };
  //   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         navigate('/signin'); // Redirect to sign-in if no token
//     }
// }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty</p>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
              >
                Place Order
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;