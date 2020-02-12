let fileFlag = false;//Check if a file was loaded
let gLink;//Save all the links
let gNode;//Save all the nodes
//These 2 variables will be used later in order to restore the opacity of all the links and nodes.

//The event listener that loads a file or warn that a file is already loaded.
const nodeTypes = ['campaign','course-of-action','attack-pattern','identity','indicator','intrusion-set','malware','marking-definition','observed-data','report','sighting','threat-actor','tool','vulnerability'];
document.getElementById('docpicker').addEventListener(
    'change', 
    changeEvent => {
      changeEvent.stopPropagation();
      changeEvent.preventDefault();
        if (!fileFlag) {
            fileFlag = true;
            readJsonFile(changeEvent.target.files[0]);//The function that reads the file and initiates the force directed graph.
            swal("Stix2Viz","File uploaded successfully.","success");//Send an alert to the user that the file was loaded successfully.
        }
        else if(fileFlag && (changeEvent.target.files.length ===1)){//if a file is already loaded send a warning.
            swal("Stix2Viz","There is a file already uploaded.\nUse the Clear button first then select a new file.","error");
        }
    },
    false
  );
  // JSON FILE READER
function readJsonFile(jsonFile) {//The implementation of readJsonFile function
    let reader = new FileReader();//Instantiate a new file reader.
    reader.addEventListener('load', (loadEvent) => {//Add an event listener to the file reader.
      try {
        let json = JSON.parse(loadEvent.target.result);//Read the json file that was loaded.
        let links_data=[];//The array that contains all the link data.
        let nodes_data=[];//The array that contains all the node data.
         //Save all the link and node data from the JSON file to their respective arrays.
        for (let i = 0; i < json.objects.length; i++) {
            if (json.objects[i].type === 'relationship') {
                links_data.push(json.objects[i]);
            }
            else if(nodeTypes.includes(json.objects[i].type)){
                nodes_data.push(json.objects[i]);
            }
        }
        //Convert the links' data into the right format
        let links_data1=[];
        for(let j=0;j<links_data.length;j++){
            let strLink=JSON.stringify(links_data[j]);
            let arr=JSON.parse(strLink);
            arr.source=arr.source_ref;
            arr.target=arr.target_ref;
            delete arr.source_ref;
            delete arr.target_ref;
            links_data1.push(arr);
          }
        //Set up the SVG element.
        let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        let defs = svg.append('svg:defs');


        //The patterns of the images
        defs.append("svg:pattern")
            .attr("id", "myPattern1")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/attack_pattern.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern2")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/campaign.png")
            .attr("width", 20.6)
            .attr("height", 20.6)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern3")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/course_of_action.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern4")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/identity.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern5")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/indicator.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern6")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/intrusion_set.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern7")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/malware.png")
            .attr("width", 20.5)
            .attr("height", 20.5)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern8")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/marking_def.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern9")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/observed_data.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern10")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/report.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern11")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/sighting.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern12")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/threat_actor.png")
            .attr("width",20)
            .attr("height",20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern13")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/tool.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);
        defs.append("svg:pattern")
            .attr("id", "myPattern14")
            .attr("width", 1)
            .attr("height", 1)
            .append("svg:image")
            .attr("xlink:href","./images/vulnerability.png")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", 0);

         //Set up the simulation
        let simulation = d3.forceSimulation()
            .nodes(nodes_data);
        let link_force =  d3.forceLink(links_data1)
            .id(function(d) {
                return d.id; })
            .distance(60);
        //Add forces to the simulation.
        simulation
            .force("charge_force", d3.forceManyBody().distanceMax(95).strength(-100))
            .force("center_force", d3.forceCenter(width/2 , height/2 ))
            .force("collision_force", d3.forceCollide().radius(3).strength(-1))
            .force("links",link_force);
        //Update circle positions to reflect node updates on each tick of the simulation.
        simulation.on("tick", tickActions );
        //add encompassing group for the zoom
        let g = svg.append("g")
            .attr("class", "everything");

        //Define and create the arrowheads for the links
        defs.selectAll('marker')
            .data([{ id: 'end-arrow', opacity:1}])
            .enter().append('marker')
            .attr('id', d => d.id)
            .attr("viewBox", "0 0 10 10")
            .attr('refX', 34)
            .attr('refY', 5)
            .attr('markerWidth', 4)
            .attr('markerHeight', 4)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,0 L0,10 L10,5 z')
            .style('opacity', function (d) {
                return d.opacity;
            });
        //Draw lines for the links and append them to the svg element.
        let link = g.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(links_data1)
            .enter().append("line")
            .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
            })
            .attr("marker-end", "url(#end-arrow)");
        //Draw the circles for the nodes,fill them with the appropriate icons and append them to the svg element.
        gLink = link;
        let node = g.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes_data)
            .enter()
            .append("circle")
            .attr("r", 10)
            .style("fill",function(d){
                if(d.type==="attack-pattern"){
                    return "url(#myPattern1)";
                }
                else if(d.type==="campaign"){
                    return "url(#myPattern2)";
                }
                else if(d.type==="course-of-action"){
                    return "url(#myPattern3)";
                }
                else if(d.type==="identity"){
                    return "url(#myPattern4)";
                }
                else if(d.type==="indicator"){
                    return "url(#myPattern5)";
                }   
                else if(d.type==="intrusion-set"){
                    return "url(#myPattern6)";
                }
                else if(d.type==="malware"){
                    return "url(#myPattern7)";
                }
                else if(d.type==="marking-definition"){
                    return "url(#myPattern8)";
                }
                else if(d.type==="observed-data"){
                    return "url(#myPattern9)";
                }
                else if(d.type==="report"){
                    return "url(#myPattern10)";
                }
                else if(d.type==="sighting"){
                    return "url(#myPattern11)";
                }
                else if(d.type==="threat-actor"){
                    return "url(#myPattern12)";
                }
                else if(d.type==="tool"){
                    return "url(#myPattern13)";
                }
                else {
                    return "url(#myPattern14)";
                }
            });
        gNode = node;//Save all nodes.


        //Set up the drag handler with event listeners(start,drag,end).
        let drag_handler=d3.drag()
            .on("start",drag_start)
            .on("drag",drag_drag)
            .on("end",drag_end);
        //Add the drag handler on.
        drag_handler(node);
        
         //Add zoom capabilities-Create a variable to store the function that is applied on SVG elements to allow them to have zoom functionality.
        let zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

        zoom_handler(svg);

        //The function that retrieves the neighboring nodes of the selected node(d).
        function getNeighbors(d){
            let neighbors=[];
            for(let i=0;i<links_data1.length;i++){
            if(links_data1[i].target.id===d.id){
                neighbors.push(links_data1[i].source.id);
                }
            else if(links_data1[i].source.id==d.id) {
                neighbors.push(links_data1[i].target.id);
                }
            }
            return neighbors;
        }
        //Implement tha drag_start function that is triggered when the user clicks on the node(d)
        function drag_start(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();//Check the active property in order to  keep the simulation going as long as there is at least one active drag occurring.
            //Set the fixed position of the dragged node to be wherever it was when the user has clicked the mouse
            d.fx = d.x;
            d.fy = d.y;
            d3.selectAll("circle").style("stroke","#625D5D");
            d3.select(this).style("stroke","   #990099");//Highlight the selected node.
            let neighbors=getNeighbors(d);//Find the neighbors of the selected node(d).
            for(let i=0;i<nodes_data.length;i++){//Reduce the opacity of the non-neighboring nodes
                if(neighbors.indexOf(d3.selectAll("g.nodes").nodes()[0].childNodes[i].__data__.id)==-1){
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.opacity='0.1';
                }
                else{//Highlight the neighboring nodes
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.opacity='1';
                }
                //Highlight the parent node of the selected node.
                if(d3.select(this)._groups[0][0].__data__.created_by_ref==d3.selectAll("g.nodes").nodes()[0].childNodes[i].__data__.id){
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.opacity='1';
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.stroke='#00FF00';
                }
            }

            d3.select(this).style('opacity',1);//Highlight the selected node.
            for(let j=0;j<links_data1.length;j++){//Highlight the links of the selected node and its neighbors.
                if(link._groups[0][j].__data__.source.id===d.id || link._groups[0][j].__data__.target.id===d.id){
                    link._groups[0][j].style.opacity='1';
                }
                else{//Reduce the opacity of the links of the non-neighboring nodes.
                    link._groups[0][j].style.opacity='0.1';
                }
            }
            //Display the properties of the selected node depending on the node type.
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            if (d.type === "malware"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').textContent = 'Label: '+d.labels;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot2').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type === "identity"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Identity Class: " + d.identity_class;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = 'Sectors: '+ d.sectors;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot3').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type === "marking-definition"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Created by Ref: '+d.created_by_ref;
                document.querySelector('#List-Name').textContent = "Definition Type: " + d.definition_type;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = d.definition_type.charAt(0).toUpperCase() +d.definition_type.slice(1) +': '+d.definition.statement;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot2').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="campaign"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "First seen: " + d.first_seen;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot2').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="attack-pattern"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#description').textContent = d.description;
                /*if (false){
                     document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                    document.querySelector('#List-Pivot1').textContent ="External Ref: "+d.external_references[0].source_name+"/"+d.external_references[0].description+"/"+d.external_references[0].external_id;
                }*/
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Kill Chain Phases: "+d.kill_chain_phases[0].kill_chain_name+"/"+d.kill_chain_phases[0].phase_name;
                document.querySelector('#List-Pivot2').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="course-of-action"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                let temptext,finaltext="";
                for (let a in d.external_references){
                    let b = parseInt(a)+1;
                    temptext = b+")Name: "+d.external_references[a].source_name +" |Description: "+ d.external_references[a].description +" |Url: "+d.external_references[a].url;
                    if (parseInt(a)!==(d.external_references.length-1)) finaltext=finaltext+temptext +"----";
                    else  finaltext = finaltext + temptext;
                }
                document.querySelector('#List-Pivot1').textContent = "External Ref: "+finaltext;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot2').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="indicator"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Pattern: "+d.pattern;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Labels: "+d.labels;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').textContent = "Valid from: "+d.valid_from;
                document.querySelector('#List-Pivot4').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="vulnerability"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "External Ref: "+d.external_references[0].source_name+"/"+d.external_references[0].external_id;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot2').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="report"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Labels: "+d.labels;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Published: "+d.published;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot3').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');

            }
            else if (d.type==="threat-actor"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Labels: "+d.labels;
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Aliases: "+d.aliases;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').textContent = "Primary Motivations: " +d.primary_motivation;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').textContent = "Secondary Motivations: " +d.secondary_motivations;
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot5').textContent = "Personal Motivations: " +d.personal_motivations;
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot6').textContent = "Goals: " +d.goals;
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot7').textContent = "Roles: " +d.roles;
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot8').textContent = "Sophistication Level: " +d.sophistication;
            }
            else if (d.type==="intrusion-set"){
                document.querySelector('#description').textContent = "";
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "First seen: "+d.first_seen;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Last seen: "+d.last_seen;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').textContent = "Aliases: "+d.aliases;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').textContent = "Primary Motivations: "+d.primary_motivation;
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot5').textContent = "Secondary Motivations: "+d.secondary_motivations;
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot6').textContent = "Resource Level: "+d.resource_level;
                document.querySelector('#List-Pivot7').setAttribute('value','visibility:visible');
                document.querySelector('#List-Pivot7').textContent = "Goals: "+d.goals;

            }
            else if (d.type==="tool"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = 'Name: '+d.name;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Tool Version: "+d.tool_version;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Labels: "+d.labels;
                document.querySelector('#description').textContent = "";
                document.querySelector('#List-Pivot3').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
            else if (d.type==="sighting"){
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = "Last seen: "+d.last_seen;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Sighting of: "+d.sighting_of_ref;
                document.querySelector('#description').textContent = "";
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Observed Data: "+d.observed_data_refs;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').textContent = "Where sighted: "+d.where_sighted_refs;
                document.querySelector('#List-Pivot4').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
            }
        else{
                document.querySelector('#list-property').setAttribute('style','visibility:visible');
                document.querySelector('#description-block').setAttribute('style','visibility:visible');
                document.querySelector('#List-Id').textContent = 'Id: '+d.id;
                document.querySelector('#List-Type').textContent = 'Type: '+d.type;
                document.querySelector('#List-Created').textContent = 'Created: '+d.created;
                document.querySelector('#List-Modified').textContent = 'Modified: '+d.modified;
                document.querySelector('#List-Name').textContent = "First observed: "+d.first_observed;
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent = "Last observed: "+d.last_observed;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Number observed: "+d.number_observed;
                document.querySelector('#List-Pivot3').textContent = "Created by: "+d.created_by_ref;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot6').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot7').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot8').setAttribute('style','visibility:hidden');
                document.querySelector('#description').textContent = "";
            }
        }
        //Implement the drag_drag function in order to set the fixed position of the node(d) to wherever the mouse currently is.
        function drag_drag(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        //Implement the drag_end function in order to set the fixed position of the node to null. This will allow the node to “spring back” to wherever the simulation puts it to achieve a stable state.
        function drag_end(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;

        }
        //Implement the zoom_actions() function
        function zoom_actions(){
            g.attr("transform", d3.event.transform)
        }


        //Implement the tickActions function to update circle locations and then call this function on every tick(iteration) of the simulation.
        function tickActions() {
            node
                .attr("cx", function(d) { return d.x ; })
                .attr("cy", function(d) { return d.y ; });

            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }
      }catch (error) {//Handle the possible errors
          swal({
              title: "Stix2Viz",
              text: "An error has occurred. Please try again.\n"+error,
              icon: "warning",
              button: "OK"
          }).then((OK) => {
              location.reload();
          });
      }
    });
    reader.readAsText(jsonFile);//Complete the file reading.
}
//Add an event listener to the restore button to restore the opacity of all the nodes in the simulation.
document.getElementById('restore-button').addEventListener('click',function () {
        if (fileFlag) {
            gLink.style('opacity',1);
            gNode.style('opacity',1);
        } else {
            swal("Stix2Viz","There is no file to restore.","error");
        }

    });
//Add an event listener to the clear-button in order to reset the simulation.
document.getElementById('clearSvg-button').addEventListener('click',function () {
        swal({
            title: "Stix2Viz",
            text: "Do you want to load a new file?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fileFlag = false;
                location.reload();}
        });
    });
