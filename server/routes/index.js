const express =  require('express')
const axios = require('axios')
const qs = require('qs')

const personalInfo = {
    name: "Marcella",
    lastname: "Gutierrez",
};

const BASE_URL = 'https://api.mercadolibre.com';
const router = express.Router();

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        author: personalInfo
    },
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});

router.get('/',  (async (req,res) =>{
    const { q } = req.query || ':query';
    try {
        const { data } = await api.get('/sites/MLA/search', { params: {  q: q,  limit: 4  } });
        const {available_filters, results} = data

        const customItems = {
            author: personalInfo,
            categories: available_filters.find((filter) => filter.id=="category")?.values.map((v) => v.name) || [],
            items: results.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    price:{
                        currency: item.currency_id,
                        amount: item.price,
                        decimals: 2
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping?.free_shipping,
                };
              })
        };
        res.status(200).json({message: customItems});
    } catch (error) {
        res.status(400).json({message: error.data})
    }
}))

router.get('/:id', (async (req, res) => {

    const {id} = req.params;
    const urlSingleItem = api.get(`/items/${id}`);
    const urlDescription =  api.get(`/items/${id}/description`);

    axios.all([urlSingleItem, urlDescription]).then(
    axios.spread((...responses) => {
      const {data } = responses[0];
      const { plain_text} = responses[1].data;

      const customItem =  Object.assign({
        author: personalInfo,
        item:{
            id: data.id,
            title: data.title,
            price:{
                currency: data.currency_id,
                amount: data.price,
                decimals: 2
            },
            picture: data.thumbnail,
            condition: data.condition,
            free_shipping: data.shipping?.free_shipping,
            sold_quantity: data.variations.find((res) => res.hasOwnProperty("sold_quantity"))?.sold_quantity,
            description: plain_text
        }
      })

      res.status(200).json({message: customItem})
    })
  )
  .catch(errors => {
    console.error(errors);
    res.status(400).json({message: errors.data})
  });
}));

module.exports = router;