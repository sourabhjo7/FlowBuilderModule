import React from "react";
import {controller, publish, publishNode, subscribe} from "./events.js";
import {useRete} from "./rete.js";
import PropTypes from 'prop-types'; // ES6


function Editor({data}) {
  const [setContainer] = useRete(data);

  return (
    <>
      <div id="123"
        style={{
          backgroundColor: "inherit",
        }}
        ref={(ref) => ref && setContainer(ref)}
      ></div>
    </>
  );
}

let x, y, zoom;
subscribe("catchPosition", async ({x1,y1,zoom1}) => {
  x = x1;
  y = y1;
  zoom = zoom1

});
const propsStructure = {
  theme:null,
  options:null,
  renderNode:null,
} 
 class Flowbuilder extends React.Component {

  
constructor(props) {
    super(props);
    this.renderArrow = function (fromNodeId, toNodeId, data) {
      publish("renderArrow", {fromNodeId, toNodeId, data});
    }
    this.reset = function () {
      publish("resetEverything");
    }
    this.position ={
      setPosition: function ({x, y, zoom}) {
        publish("setPosition", {x, y, zoom});
      },
      get:  function () {
  
         publish("getPosition");
  
        return {x, y, zoom};
      },
      reset: function () {
        publish("positionReset");
      }
    }
    this.nodes= {
      add: function ({node}) {
        publishNode("add node", node);
      },
      remove: function ({nodeId}) {
        publish("delete node", {nodeId});
      },
      reset: function () {
        publish("nodesPositionReset");
      },
    }
    this.on= async function (eventName, listener) {
      document.addEventListener(eventName, listener);
   }
    
  }
  
 render(){
  return (
  <Editor  data={this.props}/>
  );
}
}
Flowbuilder.propTypes={
  theme: PropTypes.object,
  options: PropTypes.object,
  renderArrow: PropTypes.func,
  renderNode: PropTypes.func,
}
export default Flowbuilder;
