import React from 'react';
import { Helmet } from 'react-helmet';

const Meta  = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{ title }</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {

   title: 'Welcome to E-Commerce Shop',
   description: 'Buy our products, sales ends up tomorrow',
   keywords: 'watches, parfums, women parfums, man watches, man parfums, women watches'
}

export default Meta;
