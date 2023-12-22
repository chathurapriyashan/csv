export default class CVSObject{
    #dataArray = []
    #numberOfRows = 0;
    #dataSet = [];
    /**
     * 
     * @param {String} csvText  get csv Text as String
     */
    constructor(csvText){
        this.csvText = new String(csvText);
        this.data  = {};
        this.#init();
    }
    
    #init(){
        this.#dataArray = this.csvText.split('\r\n').map( values => values.split(',').map( value => (Number.isFinite(+value)? +value : value)));

        this.headers = this.#dataArray.splice(0,1).flat();
        this.#numberOfRows = this.#dataArray.length;

        this.headers.forEach((columnName,index)=>{
            this.data[columnName] = this.#dataArray.map(valueArray=> valueArray[index]);
        })

        this.#updateMainData(this.data);
    }

    /**
     * 
     * @param {Array} filters 
     * CSVtext data converted javascript object and filter  by it given filter names array 
     * @returns  csvDataObject
     */

    getData(filters){
        let filterObject = this.data;
        if(filters && (filters.length != 0)){
            filterObject = {}
            filters.forEach((columnName)=> filterObject[columnName]= this.data[columnName]);
        }

        return filterObject ;
    }

    #encodeIndexing(array=[]){
        const classes = [];
        array.forEach(value=> classes.includes(value) ? undefined : classes.push(value));
        classes.sort()

        const encodedArray = array.map(value=> classes.indexOf(value));
        return [classes , encodedArray];
    }

    /**
     * 
     * @returns Encoded csvDataObject use array index
     */

    encodeIndexing(){
        this.encode = {};
        this.encodeClasses = {}

        for (const [key,value] of Object.entries(this.data)){

            this.encode[key] = value;

            if (!Number.isFinite(value[0])) {
                const [classes,encodeArray] = this.#encodeIndexing(value);
                this.encodeClasses[key] = classes;
                this.encode[key] = encodeArray;
            }
        }
        this.#updateMainData(this.encode)
        return this.encode;
    }

    /**
     * 
     * @param {Array} filters get column name as filtering array 
     * @returns if you not provide filters it return full dataset
     * @returns filtered CsvDataMatrix
     */

    getDataSet(filters){
        let dataset = this.#dataSet;
        if(filters && filters.length != 0 ){
            dataset = [];
            const indexes  = filters.map(name=> this.#dataSet[0].indexOf(name));
            this.#dataSet.slice(1).forEach(dataArray=>{
                const temporyArray = indexes.map(index=> dataArray[index])
                dataset.push(temporyArray);
            })
            dataset.unshift(filters);
        }
        return dataset;
    }



    #updateMainData(updatedObject){
        this.#dataSet = [];
        const headers= [];
        for ( const [key , values] of Object.entries(updatedObject)){
            headers.push(key);
        }
        for (let row=0 ; row < this.#numberOfRows ; row ++){
            const temporyArray= [];
            for ( const [key , values] of Object.entries(updatedObject)){
                temporyArray.push(values[row]);
            }
            this.#dataSet.push(temporyArray);
        }
        this.#dataSet.unshift(headers);

    }
}