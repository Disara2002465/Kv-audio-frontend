// import "./productCard.css";

export default function ProductCard(props) {
  const item = props.item;
  return <h1>{item.name}</h1>;
}
