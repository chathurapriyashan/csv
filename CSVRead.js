import CVSObject from "./csvObj.js";

export default class CSVReader{
    /**
     * This fuction is more about decode and and encode cvs data;
     * and read files sycronously
     * @example
     * const csvReader = new CSVReader();
     * const youtubeData = cvsReader.read("./youtubeAnalitics.csv");
     */
    constructor(){
    }

    /**
     * 
     * @param {String} path 
     * @returns Csv data object
     */

    read(path){
        const xml = new XMLHttpRequest();
        xml.open('get' , path , false);
        xml.send();
        return new CVSObject(xml.responseText);
    }
}