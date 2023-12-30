class APIFeature{
    constructor(query,queryString)
    {
    this.query=query;
     this.queryString=queryString;
    }
    filter(){
        const queryObj={...this.queryString};
        const excludeFields=["page","sort","limit","Fields"];
        excludeFields.forEach((el)=>delete queryObj[el]);
        let queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
         this.query=this.query.find(JSON.parse(queryStr));
         console.log(this.queryString);
         return this;
    }
    sort(){
        if(this.queryString.sort)
        {
        const  sortBy=this.query.sort.splite(",").join(" ");
        this.query=this.query.sort(sortBy);
        }else
        {
        this.query=this.query.sort('-createdAt');
        }
        return this;
    }
    limit(){
        if(this.queryString.fields)
        {
        const  fields=this.query.fields.splite(",").join(" ");
        this.query=this.query.select(fields);
        }else
        {
        this.query=this.query.select('-__v');
        }
        return this;
    }
    pagination(){
         const page=this.queryString.page*1 ||1;
         const limit= this.queryString.limit*1 || 100;
         const skip=(page -1 )*limit;
            this.query=this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports=APIFeature;  