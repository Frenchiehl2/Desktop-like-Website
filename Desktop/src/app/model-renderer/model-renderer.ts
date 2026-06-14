import { Component, EventEmitter, input, Input, model, OnChanges, Output,  SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

@Component({
  selector: 'app-model-renderer',
  imports: [],
  templateUrl: './model-renderer.html',
  styleUrl: './model-renderer.css',
})
export class ModelRenderer implements OnChanges{

   @Input() signal: boolean = false;
   @Input() modelID = 0;
   @Input() modelLink ="";
   @Input() Model="";
   @Input() previewImage="";
   @Input() CamXpos = 0;
   @Input() CamYpos = 2;
   @Input() CamZpos = 10;
   @Output() clearModels = new EventEmitter<{renderer:ModelRenderer}>();
   
   DefaultCameraPos = new THREE.Vector3(0,2,10);
   loadedModel = false;
   isHidden = false;
   
  //  loader = new GLTFLoader();
  //  ktx2Loader = new KTX2Loader();
    canvasSizes = {
      width: 1000,
      height: 500,
    };
   
    renderer = new THREE.WebGLRenderer();
   scene = new THREE.Scene();
   ngOnChanges(changes: SimpleChanges) {
 
     if (changes['signal'] && changes['signal'].currentValue) {
       this.OnInitializeModel();
     }
   }
 
   async OnInitializeModel(){
    const canvas = document.getElementById(this.modelID.toString());

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd8dcdd);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 5;
    pointLight.position.y = 5;
    pointLight.position.z = 5;
    this.scene.add(pointLight);

    this.DefaultCameraPos = new THREE.Vector3(this.CamXpos,this.CamYpos,this.CamZpos);

    
    const camera = new THREE.PerspectiveCamera(
      75,
      this.canvasSizes.width / this.canvasSizes.height,
      0.001,
      1000
    ); 
    camera.position.z = this.DefaultCameraPos.z;
    camera.position.y = this.DefaultCameraPos.y;
    camera.position.x = this.DefaultCameraPos.x;
    this.scene.add(camera);
    
    
    if (!canvas) {
      return;
    }
    
     this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    this.renderer.setClearColor(0xe232222, 1);
    this.renderer.setSize(this.canvasSizes.width, this.canvasSizes.height);

    let modelRef = new THREE.Object3D();

    //load model
    if(this.loadedModel){
      const loader = new GLTFLoader();
      const data = await loader.loadAsync(this.Model);
      modelRef = data.scene;
    }

    this.scene.add(modelRef);

    //controls
    const controls = new OrbitControls(camera,canvas);
    controls.target.set(0,this.CamYpos,0);
    controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE,   // Change 0 to 1 for middle click
    MIDDLE: THREE.MOUSE.PAN,  // Zoom
  };

    const clock = new THREE.Timer();
    clock.connect(document);
    let light = new THREE.AmbientLight(0xffffff,1);
    this.scene.add(light);

    const animateGeometry = () => {
      clock.update();
      const elapsedTime = clock.getElapsed();
    
      // Update animaiton objects
      modelRef.rotation.y = elapsedTime/4
    
  
      // Render
      controls.update();
      this.renderer.render(this.scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(animateGeometry);
    };
    animateGeometry();
  }
  
  DisplayPreview(){
    
  }
  OnReset($event:MouseEvent){

    if($event.button != 0){
      return;
    }

    if(this.loadedModel == false){
        this.isHidden = true;
        this.loadedModel = true;
        this.OnInitializeModel();
        this.clearModels.emit({renderer:this});    
    }
  }

  OnUnloadModel(){
    if(this.loadedModel == false){
      this.scene.clear();
      this.isHidden = false;
    }else{
      this.loadedModel = false;
    }
  }
}
