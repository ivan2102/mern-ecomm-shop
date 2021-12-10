import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            {/* <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; E-Commerce Shop</Col>
                </Row>
            </Container> */}

{/* <div class="top_header">
<section>
<span><i class="fa fa-map-marker"></i></span>
<span>Street, full address, state/province, country, pincode</span>
</section>
<section>
<span><i class="fa fa-phone"></i></span>
<span>(00) 0000 0000</span>
</section>
<section>
<span><i class="fa fa-envelope"></i></span>
<span>info@websitename.com</span>
</section>
</div> */}
<span class="border-shape"></span>
<div class="bottom_content">
<section>
<a target="_blank" href="https://www.facebook.com"><i class="fa fa-facebook"></i></a>
<a target="_blank" href="https://www.instagram.com"><i class="fa fa-instagram"></i></a>
<a target="_blank" href="https://www.twitter.com"><i class="fa fa-twitter"></i></a>
<a target="_blank" href="https://www.telegram.com"><i class="fa fa-telegram"></i></a>
</section>
<section>
<a href="#">Home</a>
<a href="#">About us</a>
<a href="#">Order</a>
<a href="#">Retail</a>
<a href="#">Member</a>
<a href="#">Contact Us</a>
</section>
</div>
<div class="copyright">
Copyright © 2021 E-Commerce store - All rights reserved 
</div>
           
</footer>
    )
}

export default Footer;
