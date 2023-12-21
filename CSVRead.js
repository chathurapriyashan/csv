import CVSObject from "./csvObj.js";

export default class CSVReader{
    constructor(){
    }

    read(path){
        const xml = new XMLHttpRequest();
        xml.open('get' , path , false);
        xml.send();
        return new CVSObject(xml.responseText);
    }
}