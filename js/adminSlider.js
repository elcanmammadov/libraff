import { getAllSliders } from "./service.js";

getAllSliders;
let slides = [];
async function getData() {
    slides = await getAllSliders();
    printSliders();
  }
  getData();

  function printSliders() {
    
    }