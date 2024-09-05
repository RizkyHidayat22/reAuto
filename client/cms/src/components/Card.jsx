export default function Card({product}) {
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl pt-10">
        <figure>
          <img src={product.imageUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.brand} {product.model}</h2>
          <h3>kilometer : {product.kilometer}</h3>
          <h3>year : {product.year}</h3>
          <h3>transmission : {product.transmission}</h3>
          <h3>color : {product.color}</h3>
         <h3>description : {product.description} </h3>
        <h3> price : {product.price}</h3>
        <h3>type : {product.categoryId}</h3>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

