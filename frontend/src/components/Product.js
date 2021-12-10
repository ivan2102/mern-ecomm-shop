import { Card, CardImg, CardTitle, CardText, CardBody } from "reactstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <CardImg src={ product.image } variant="top" />
            </Link>

            <CardBody>
                <Link to={`/product/${product._id}`}>
                    <CardTitle as="div">
                        <strong>{ product.name }</strong>
                    </CardTitle>
                </Link>

                <CardText as="div">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </CardText>

                <CardText as="h3">
                ${product.price}
                </CardText>
            </CardBody>
        </Card>
    )
}

export default Product;

