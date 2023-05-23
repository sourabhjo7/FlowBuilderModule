import {Grid} from "@mui/material";
import {Paper} from "@mui/material";
import {useTheme} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useState} from "react";
import React from "react";
import {useRef} from "react";
import FlowBuilder from "./FlowBuilder";

export default function Sample1() {
  const theme = useTheme();

  let flowRef = useRef(new FlowBuilder());
  let flowManager = null;
  if (flowRef.current) {
    flowManager = flowRef.current;
  }

  let defaultOptions = {
    nodes: {},
  };

  const [options, setOptions] = useState(defaultOptions);

  if (flowManager) {
    flowManager.on("node.click", ({event, node, options}) => {
      console.log("====================================");
      console.log("node.click is triggered on", {
        event: event,
        node: node,
        options: options,
      });
      console.log(
        "====== event.width ==============================",
        event.width,
      );
    });
    flowManager.on("node.added", ({node, options}) => {
      console.log("nodes is added====>", node, options);
    });
    flowManager.on("node.removed", ({node, options}) => {
      console.log("node is removed===>", node, options);

    });
    flowManager.on("loaded", ({options}) => {
      console.log("====================================");
      console.log("document is fully loaded ", options); // options is the state all the nodes
      console.log("====================================");
    });
    flowManager.on("node.mouse.over", ({event, node, options}) => {
      console.log("mouse over--->", {event, node, options});
    });
    flowManager.on("node.mouse.out", ({event, node, options}) => {
      console.log("mouse out", {event, node, options});
    });

    flowManager.on("position.changed", ({options}) => {
      console.log("canvas position is changed", options); // here options is the object with position property.x /y/zoom
    });

    flowManager.on("node.mouse.down", ({event, node, options}) => {
      console.log("mouse down", {event, node, options});
    });
    flowManager.on("node.mouse.up", ({event, node, options}) => {
      console.log("mouse up", {event, node, options});
    });
    flowManager.on("node.position_changed", ({event, node, options}) => {
      console.log("node position changed-->", {event, node, options});
    });
    flowManager.on("node.drag.start", ({event, node, options}) => {
      console.log("node drag start", {event, node, options});
    });
    flowManager.on("node.drag.end", ({event, node, options}) => {
      console.log("node drag end", {event, node, options});
    });
    flowManager.on("change", ({ node, options }) => {
      console.log("changed --nodes ",node,options);
    });
    flowManager.on("node.meta.updated", ({ node, options }) => {
       console.log("meta updated ");

    });

  }

  console.log(`#202227610501820 flowManager`, flowManager);
let number=1;
  return (
    <>
      <Grid container justifyContent={"center"} spacing={4}>
        <Grid item xs={12} container direction={"row"} spacing={2} justifyContent={"center"}>
          <Grid item xs={3}>
            <Card>
              <h4>Position</h4>
              <Button
                onClick={() => {
                  flowManager.position.setPosition({x: 100, y: 100, zoom: 2}); // x, y, zoom
                }}
              >
                set
              </Button>
              <Button
                onClick={() => {
                  // return {x, y, zoom}
                  console.log(`#2022286113945941 position`, flowManager.position.get());
                }}
              >
                get
              </Button>
              <Button
                onClick={async () => {
                  flowManager.position.reset();
                }}
              >
                reset
              </Button>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <h4>Nodes</h4>
              <Button
                onClick={() => {
                  flowManager.nodes.reset();
                }}
              >
                nodes reset
              </Button>
              <Button
                onClick={() => {
                  flowManager.nodes.add({
                    node: {
                      nodeId: Date.now(),
                      options: {},
                      parentNodeId: `baz`,
                    },
                  });
                }}
              >
                Add root node
              </Button>
              <Button
                onClick={() => {
                  flowManager.nodes.add({
                    node: {
                      nodeId: Date.now(),
                      options: {},
                      parentNodeId: `baz`,
                    },
                  });
                }}
              >
                Add root node
              </Button>
            </Card>
          </Grid>
          <Grid item xs={3}>

            <Card>
              <Button
                onClick={() => {
                  flowManager.reset();
                }}
              >
                Reset all
              </Button>
              <Button
                onClick={() => {
                  let current = flowManager.position.get();
                  flowManager.position.setPosition({zoom: current.zoom + 0.3});
                }}
              >
                Zoom In
              </Button>
              <Button
                onClick={() => {
                  let current = flowManager.position.get();
                  flowManager.position.setPosition({zoom: current.zoom - 0.3});
                }}
              >
                Zoom Out
              </Button>
              <button
        type="button"
        onClick={() => {
          flowManager.renderArrow("node-1", "node-2", {
            fill: "blue",
            stroke: "none",
            strokeWidth: "2px",
          }); // reload the page
        }}
      >
        renderArrow
      </button>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={"h3"} textAlign={"center"}>
            Canvas Demo
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Paper style={{width: "100%", height: "70vh"}} elevation={10}>
            <FlowBuilder
              ref={flowRef}
              theme={{
                whitespaceAroundNode: 30, 
                arrow: { 
                  fill: theme.palette.error.dark,
                  strokeWidth: "1px",
                  size:10
                },
              }}
              disableZoom={true}
              options={options}
              renderArrow={({ fromNodeId, toNodeId }) => {
                  return {
                    fill: "green",
                    strokeWidth: "2px",
                  };
              }}
              newNodePosition="down" //   auto | up  | down  to decide where the next node will be added 
              renderNode={({node, options}) => {
                return (
                  <Card style={{textAlign: "center"}}>
                    <CardContent>
                      <Typography variant="caption" component="div">
                        {JSON.stringify(node)}
                      </Typography>
                      <Button
                        color={"error"}
                        onClick={() => {
                          flowManager.nodes.remove({nodeId: node.nodeId});
                        }}
                      >
                        Remove This
                      </Button>
                      <Button
                        onClick={() => {
                          flowManager.nodes.add({
                            node: {
                              nodeId: Date.now(),
                              options: {},
                              parentNodeId: node.nodeId,
                            },
                          });
                        }}
                      >
                        Add next node
                      </Button>
                    </CardContent>
                  </Card>
                );
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
