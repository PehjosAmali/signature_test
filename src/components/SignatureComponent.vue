<template>
  <div class="pdf_saection">
    <p>this is PDF sec</p>
  </div>
  <div class="canva_sec" ref="container"></div>

  
  
  <div class="signature_pad">
<div class="header">
 <h4 class="H900 ">Create New Signature</h4> 
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="#696F8C"/>
  </svg>
  

</div>
<div class="menu_tab">
  <p @click="toggle">Draw</p>
  <p @click="showtext=true">Type</p>
</div>
<div class="signature_pad_sec">
  <div class="pd_cont">
    <VueSignaturePad v-if="show"
      id="signature"

      height="200px"
      scaleToDevicePixelRatio="true"
      ref="signaturePad"
      :options="options"
    />
    <div v-if="showtext">hello</div>
  </div>
  <div class="colors">
    <div class="colors_left">
    <div @click="resume" class="c_value c1"></div>
    <div @click="changeblue" class="c_value c2"></div>
    <div @click="changered" class="c_value c3"></div>
    <div @click="changegray" class="c_value c4"></div>
    <div @click="changeblack" class="c_value c5"></div>
    <div @click="changegreen" class="c_value c6"></div>
    </div>
    <div @click="undo" class="colors_right">
    <p>undo</p>
    <h6 @click="save">Create</h6>
    </div>
  </div>
</div>

  </div>
  
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Konva from 'konva';
const show =ref(true)
const showtext =ref(false)
const toggle=()=>{
  if(show.value===true){
    showtext.value=false
  }else{
    show.value=false
  }
}
const container = ref(null);
const width = window.innerWidth;
const height = window.innerHeight;
let stage;
let layer;
let image;
let tr;
let imageSrc = ref('');
// signed logic
const options = ref({
  penColor: "#333",
});

const signaturePad = ref(null);

const undo = () => {
  signaturePad.value.undoSignature();
};

const save = () => {
  const { isEmpty, data } = signaturePad.value.saveSignature();
  console.log(isEmpty);
  load(data)
};

const changeblue = () => {
  options.value = {
    penColor: "blue",
  };
};
const changered = () => {
  options.value = {
    penColor: "red",
  };
};
const changegray = () => {
  options.value = {
    penColor: "gray",
  };
};
const changeblack = () => {
  options.value = {
    penColor: "#333",
  };
};
const changegreen = () => {
  options.value = {
    penColor: "green",
  };
};
const resume = () => {
  options.value = {
    penColor: "black",
  };
};


function load(params) {
  console.log(params);
  const images = new Image();
  images.src = params;
  image = new Konva.Image({
      x: 50,
      y: 50,
      image: images,
      width: 200,
      height: 137,
      draggable: true,
    });
    layer.add(image);
    stage.draw();

    tr = new Konva.Transformer();
    layer.add(tr);
    tr.nodes([image]);
}

onMounted(() => {
  stage = new Konva.Stage({
    container: container.value,
    width: width,
    height: height,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  const imageObj = new Image();



  imageObj.src = imageSrc.value;
});
console.log(imageSrc.value);
</script>
<style>
#signature {
  border: double 3px transparent;
  width: 443px;
  height: 140px;
  
  /* Neutral/N100 */
  
  background: #F4F6FA;
  border-radius: 8px;
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container1 {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
.pd_cont{
  margin: 5px;
}
.signature_pad{
  position: relative;
  width: 475px;
  height: 301px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 8px;
margin: 70px;
display: flex;
flex-direction: column;
justify-content: center;

}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu_tab{
  display: flex;
  width: 134px;
  height: 40px;
  left: 171px;
  background: #E6E8F0;
  border-radius: 8px;
  padding: 3px;
  position: absolute;margin-top: -110px;
align-items: center;
justify-content: space-between;
}
.menu_tab>p{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  gap: 10px;

 justify-content: center;
  width: 73px;
  height: 32px;
  left: 175px;
  top: 68px;
  background: #FFFFFF;
  border-radius: 8px;


}
.colors_right{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.colors_right>p{
margin: 5px;
}
.colors_right>h6{
  margin: 5px;
  font-size: 18px;
  }
.colors{
  display: flex;
  justify-content: space-between;
}
.colors_left{
  display: flex;
  align-items: center;
}
.pdf_saection{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  width: 100%;
  margin-left: 10%;
  margin-right: 10%;
  height: 60vh;
}
.c_value{
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 5px;

  border: 3px solid lightgray;
}
.c1{
  box-sizing: border-box;

  width: 24px;
  height: 24px;
  background: #101840;
  border: 2px solid #696F8C;
  box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.16);
}
.c2{
  background-color: blue;
}
.c3{
  background-color: red;
}
.c4{
  background-color: gray;
}
.c5{
  background-color: #333;
}
.c6{
  background-color: green;
}

</style>