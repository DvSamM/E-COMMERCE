// import { ShoppingCart, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useStore } from "@/lib/store";
// import CartDrawer from "./CartDrawer";
// import { useState } from "react";

// const Navbar = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const cart = useStore((state) => state.cart);
//   const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <nav className="border-b">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-primary">
//           ShopHub
//         </Link>
        
//         <div className="flex items-center gap-4">
//           <Link to="/auth">
//             <Button variant="ghost" size="icon">
//               <User className="h-5 w-5" />
//             </Button>
//           </Link>
          
//           <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
//             <div className="relative">
//               <ShoppingCart className="h-5 w-5" />
//               {cartItemsCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </div>
//           </Button>
//         </div>
        
//         <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import CartDrawer from "./CartDrawer";
import CurrencySelector from "./CurrencySelector";
import { useState } from "react";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();


  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold text-primary">
          ShopHub
        </Link>
        
        <div className="flex items-center gap-4">
          <CurrencySelector />
          
          
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </Button>
        </div>
        
        <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;