import "./productCard.css";

export default function ProductCard(props) {
    console.log(props.price);
    
    return (
        <div className="product-card">
            <img src={props.photoUrl} alt={props.name} className="product-image"/>
            <h3>{props.name}</h3>
            <span className="product-price">LKR {props.price}</span>
            <p className="product-description">{props.description}</p>
        </div>
    );
}
