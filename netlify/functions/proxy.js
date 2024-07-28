exports.handler = async function(event, context) {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const { site_id, client, product_id } = event.queryStringParameters;
  
    const response = await fetch(`https://www.mercadolibre.com.ar/product-fe-recommendations/recommendations?site_id=${site_id}&client=${client}&product_id=${product_id}`);
    const data = await response.json();
  
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    };
  };