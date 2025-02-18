import './App.css';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div>
      <ProductCard 
        name="Audio Setup" 
        price="3250/-" 
        description="A rental shop for audio items provides high-quality sound equipment, including speakers, microphones, mixers, and amplifiers, for events, parties, and professional use." 
        photoUrl="https://xmobile.lk/wp-content/uploads/2024/06/JBL-PartyBox-On-the-Go-Essential-Portable-Outdoor-Speaker.jpg" 
      />
      
      
      
      <ProductCard 
        name="Mini gaming machine" 
        price="2250/-" 
        description="Professional Mini gaming machine for high-quality sound blending and party experiences." 
        photoUrl="https://www.nerdly.co.uk/wp-content/uploads/2019/02/mini-arcade-1.jpg" />
    </div>
  );
}

export default App;

