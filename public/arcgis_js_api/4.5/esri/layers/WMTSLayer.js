// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators dojo/_base/lang ../request ../core/Error ../core/HandleRegistry ../core/Collection ../core/promiseUtils ./Layer ./WebTileLayer ./mixins/OperationalLayer ./mixins/PortalLayer ./support/WMTSSublayer ./mixins/RefreshableLayer ./mixins/ScaleRangeLayer ./support/wmtsUtils".split(" "),function(B,C,q,d,c,g,k,r,l,t,m,u,v,w,x,f,y,z,h){function A(c,a){return c.map(function(b){var e=
new f;e.read(b,a);return e})}var p={"image/png":".png","image/png8":".png","image/png24":".png","image/png32":".png","image/jpg":".jpg","image/jpeg":".jpeg","image/gif":".gif","image/bmp":".bmp","image/tiff":".tif","image/jpgpng":"","image/jpegpng":"","image/unknown":""};return function(n){function a(b,e){var a=n.call(this)||this;a._sublayersHandles=new l;a.copyright=null;a.customParameters=null;a.customLayerParameters=null;a.operationalLayerType="WebTiledLayer";a.resourceInfo=null;a.serviceMode=
"RESTful";a.sublayers=null;a.type="wmts";a.version="1.0.0";a.watch("activeLayer",function(b,e){e&&(e.layer=null);b&&(b.layer=a)},!0);a.watch("sublayers",function(b,e){e&&(e.forEach(function(b){b.layer=null}),a._sublayersHandles.removeAll(),a._sublayersHandles=null);b&&(b.forEach(function(b){b.layer=a}),a._sublayersHandles||(a._sublayersHandles=new l),a._sublayersHandles.add([b.on("after-add",function(b){b.item.layer=a}),b.on("after-remove",function(b){b.item.layer=null})]))},!0);return a}q(a,n);a.prototype.normalizeCtorArgs=
function(b,a){return"string"===typeof b?g.mixin({},{url:b},a):b};a.prototype.load=function(){var b=this;if("KVP"!==this.serviceMode&&"RESTful"!==this.serviceMode)console.error("WMTS mode could only be 'KVP' or 'RESTful'");else return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["WMTS"]}).then(function(){return b._fetchService()}).otherwise(function(){return m.reject(new r("wmtslayer:unsupported-service-data","Invalid response from the WMTS service."))})),this};Object.defineProperty(a.prototype,
"activeLayer",{get:function(){return this._get("activeLayer")},set:function(b){this._set("activeLayer",b)},enumerable:!0,configurable:!0});a.prototype.readActiveLayerFromService=function(b,a,c){var e=this,d;this.activeLayer?a.layers.some(function(b){return b.id===e.activeLayer.id?(d=b,!0):!1}):(this.activeLayer=new f,d=a.layers[0]);this.activeLayer.read(d,c);return this.activeLayer};a.prototype.readActiveLayerFromItemOrWebDoc=function(b,a,c){return new f({id:a.wmtsInfo.layerIdentifier,tileMatrixSetId:a.wmtsInfo.tileMatrixSet})};
a.prototype.writeActiveLayer=function(b,a){b=this.activeLayer;a.templateUrl=this.getUrlTemplate(b.id,b.tileMatrixSetId,b.imageFormat,b.styleId);a.wmtsInfo=g.mixin(a.wmtsInfo||{},{layerIdentifier:b.id,tileMatrixSet:b.tileMatrixSetId})};Object.defineProperty(a.prototype,"fullExtents",{get:function(){var b=[];this.activeLayer.tileMatrixSets.forEach(function(a){a.fullExtent&&b.push(a.fullExtent)});return b},enumerable:!0,configurable:!0});a.prototype.readServiceMode=function(b,a,c){return-1<a.templateUrl.indexOf("?")?
"KVP":"RESTful"};a.prototype.readSublayersFromService=function(b,a,c){return A(a.layers,c)};Object.defineProperty(a.prototype,"supportedSpatialReferences",{get:function(){return this.activeLayer.tileMatrixSets.map(function(b){return b.tileInfo.spatialReference}).toArray()},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"title",{get:function(){return"Layer"===this._get("title")?this.activeLayer&&this.activeLayer.title:this._get("title")},set:function(b){this._set("title",b)},enumerable:!0,
configurable:!0});Object.defineProperty(a.prototype,"url",{get:function(){return this._get("url")},set:function(b){b&&"/"===b.substr(-1)?this._set("url",b.slice(0,-1)):this._set("url",b)},enumerable:!0,configurable:!0});a.prototype.createWebTileLayer=function(b){var a=this.getUrlTemplate(this.activeLayer.id,this.activeLayer.tileMatrixSetId,this.activeLayer.imageFormat,this.activeLayer.styleId),c=this._getTileMatrixSetById(b.tileMatrixSetId).tileInfo,d=b.fullExtent;b={layerIdentifier:b.id,tileMatrixSet:b.tileMatrixSetId,
url:this.url};this.customLayerParameters&&(b.customLayerParameters=this.customLayerParameters);this.customParameters&&(b.customParameters=this.customParameters);return new v({fullExtent:d,urlTemplate:a,tileInfo:c,wmtsInfo:b})};a.prototype.fetchTile=function(b,a,c){b=this.getTileUrl(b,a,c);return k(b,{responseType:"image"}).then(function(b){return b.data})};a.prototype.findSublayerById=function(b){return this.sublayers.find(function(a){return a.id===b})};a.prototype.getTileUrl=function(b,a,c){var e=
this._getTileMatrixSetById(this.activeLayer.tileMatrixSetId).tileInfo.lods[b],e=e.levelValue?e.levelValue:String(e.level);(b=this.resourceInfo?"":h.getTileUrlFromResourceUrls(this.activeLayer.id,this.activeLayer.tileMatrixSetId,this.activeLayer.styleId,b,a,c))||(b=this.getUrlTemplate(this.activeLayer.id,this.activeLayer.tileMatrixSetId,this.activeLayer.imageFormat,this.activeLayer.styleId).replace(/\{level\}/gi,e).replace(/\{row\}/gi,a).replace(/\{col\}/gi,c));return b=this._appendCustomLayerParameters(b)};
a.prototype.getUrlTemplate=function(b,a,c,d){var e="";if(!this.resourceInfo&&(e=h.getTileUrlTemplateFromResourceUrls(b,a,c,d)))return e;"KVP"===this.serviceMode?e=this.url+"?SERVICE\x3dWMTS\x26VERSION\x3d"+this.version+"\x26REQUEST\x3dGetTile\x26LAYER\x3d"+b+"\x26STYLE\x3d"+d+"\x26FORMAT\x3d"+c+"\x26TILEMATRIXSET\x3d"+a+"\x26TILEMATRIX\x3d{level}\x26TILEROW\x3d{row}\x26TILECOL\x3d{col}":"RESTful"===this.serviceMode&&(e="",p[c.toLowerCase()]&&(e=p[c.toLowerCase()]),e=this.url+b+"/"+d+"/"+a+"/{level}/{row}/{col}"+
e);return e};a.prototype._fetchService=function(){var b=this;return m.resolve().then(function(){if(b.resourceInfo)return"KVP"===b.resourceInfo.serviceMode&&(b.url+=-1<b.url.indexOf("?")?"":"?"),{ssl:!1,data:b.resourceInfo};var a=b._getCapabilitiesUrl(b.serviceMode);return k(a,{responseType:"text",callbackParamName:"callback"}).otherwise(function(e){a=b._getCapabilitiesUrl("KVP"===b.serviceMode?"RESTful":"KVP");return k(a,{responseType:"text",callbackParamName:"callback"})})}).then(function(a){a.data=
b.resourceInfo?h.parseResourceInfo(a.data):h.parseCapabilities(a.data,{serviceMode:b.serviceMode});a.data&&b.read(a.data,{origin:"service"})})};a.prototype._getTileMatrixSetById=function(a){return this.findSublayerById(this.activeLayer.id).tileMatrixSets.find(function(b){return b.id===a})};a.prototype._appendCustomParameters=function(a){if(this.customParameters)for(var b in this.customParameters)a+=(-1===a.indexOf("?")?"?":"\x26")+b+"\x3d"+encodeURIComponent(this.customParameters[b]);return a};a.prototype._appendCustomLayerParameters=
function(a){if(this.customLayerParameters||this.customParameters){var b=g.clone(this.customParameters||{});g.mixin(b,this.customLayerParameters||{});for(var c in b)a+=(-1===a.indexOf("?")?"?":"\x26")+c+"\x3d"+encodeURIComponent(b[c])}return a};a.prototype._getCapabilitiesUrl=function(a){var b;this.url=this.url.split("?")[0];"KVP"===a?b=this.url+"?request\x3dGetCapabilities\x26service\x3dWMTS\x26version\x3d"+this.version:"RESTful"===a&&(b=this.url+"/"+this.version+"/WMTSCapabilities.xml");return b=
this._appendCustomParameters(b)};d([c.shared({"2d":"../views/2d/layers/WMTSLayerView2D","3d":"../views/3d/layers/WMTSLayerView3D"})],a.prototype,"viewModulePaths",void 0);d([c.property({type:f,dependsOn:["sublayers"],json:{origins:{"web-document":{write:{ignoreOrigin:!0}}}}})],a.prototype,"activeLayer",null);d([c.reader("service","activeLayer",["layers"])],a.prototype,"readActiveLayerFromService",null);d([c.reader(["web-document","portal-item"],"activeLayer",["wmtsInfo"])],a.prototype,"readActiveLayerFromItemOrWebDoc",
null);d([c.writer(["web-document","portal-item"],"activeLayer")],a.prototype,"writeActiveLayer",null);d([c.property()],a.prototype,"copyright",void 0);d([c.property({json:{origins:{webDocument:{read:{source:"wmtsInfo.customParameters"},write:{target:"wmtsInfo.customParameters"}},portalItem:{read:{source:"wmtsInfo.customParameters"},write:{target:"wmtsInfo.customParameters"}}}}})],a.prototype,"customParameters",void 0);d([c.property({json:{origins:{webDocument:{read:{source:"wmtsInfo.customLayerParameters"},
write:{target:"wmtsInfo.customLayerParameters"}},portalItem:{read:{source:"wmtsInfo.customLayerParameters"},write:{target:"wmtsInfo.customLayerParameters"}}}}})],a.prototype,"customLayerParameters",void 0);d([c.property({readOnly:!0,dependsOn:["activeLayer"]})],a.prototype,"fullExtents",null);d([c.property()],a.prototype,"operationalLayerType",void 0);d([c.property()],a.prototype,"resourceInfo",void 0);d([c.property()],a.prototype,"serviceMode",void 0);d([c.reader(["portal-item","web-document"],"serviceMode",
["templateUrl"])],a.prototype,"readServiceMode",null);d([c.property({type:t.ofType(f)})],a.prototype,"sublayers",void 0);d([c.reader("service","sublayers",["layers"])],a.prototype,"readSublayersFromService",null);d([c.property({readOnly:!0,dependsOn:["activeLayer"]})],a.prototype,"supportedSpatialReferences",null);d([c.property({dependsOn:["activeLayer"],json:{read:{source:"title"}}})],a.prototype,"title",null);d([c.property({json:{read:!1},readOnly:!0,value:"wmts"})],a.prototype,"type",void 0);d([c.property({json:{origins:{service:{read:{source:"tileUrl"}},
webDocument:{read:{source:"wmtsInfo.url"},write:{target:"wmtsInfo.url"}},portalItem:{read:{source:"wmtsInfo.url"},write:{target:"wmtsInfo.url"}}}}})],a.prototype,"url",null);d([c.property()],a.prototype,"version",void 0);return a=d([c.subclass("esri.layers.WMTSLayer")],a)}(c.declared(u,w,x,y,z))});