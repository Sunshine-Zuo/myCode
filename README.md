# myCode
用来保存一些有用的库或其他代码
## ThreeBSP用法示例
```
var cylinder = new THREE.CylinderGeometry(50,50,5,40);//圆柱
var box = new THREE.BoxGeometry(40,5,40);//立方体
//材质对象
var material=new THREE.MeshPhongMaterial({color:0x0000ff});
//网格模型对象
var cylinderMesh=new THREE.Mesh(cylinder,material);//圆柱
var boxMesh=new THREE.Mesh(box,material);//立方体
//包装成ThreeBSP对象
var cylinderBSP = new ThreeBSP(cylinderMesh);
var boxBSP = new ThreeBSP(boxMesh);
var result = cylinderBSP.subtract(boxBSP);
//ThreeBSP对象转化为网格模型对象,可以传入材质参数，没有则使用MeshNormalMaterial
var mesh = result.toMesh();
scene.add(mesh);//网格模型添加到场景中
```
