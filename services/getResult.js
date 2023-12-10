const models = require('../models'); // loads index.js
const { Op } = require("sequelize");
exports.getResult = async (req,modelName,allowedFilter, limit = 10) => {
    const Model = models[modelName]; 
    let currentPage = Number(req.query.page);
    let offset = limit *( currentPage - 1) ;
    const filter = {
      offset: offset, 
      limit: limit,
      where: {
      }, 
    }
    for (const key in allowedFilter) {
      //get filter name
      let fitlerName = req.query[key];

      //check if the filter comes with url
      if(req.query[key]){
        //check filter type
        let filterSearch ={ [Op.like]: `%${fitlerName}%`}
        if( allowedFilter[key] == 'number'){
          filterSearch ={ [Op.eq]: fitlerName}
        }
       // adding filter to query
        filter.where[key] = filterSearch;
      }
    }
    const modelData = await Model.findAll(filter)
    const count = await Model.count({where : filter.where})
    const totalPages = Math.ceil(count/limit)
    const  nextPage = currentPage < totalPages ? currentPage + 1 : totalPages // Calculate next page
    const  previousPage = currentPage > 1 ? currentPage - 1 : 1 // Calculate previous page
    return   {
      success:true,
      data: modelData,
      currentPage: currentPage,
      perPage: limit,
      showing:modelData.length,
      total:count,
      totalPages:totalPages,
      nextPage :nextPage,
      previousPage: previousPage
    }

}