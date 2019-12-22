let fileFlag = false;
let gLink;
let gNode;
document.getElementById('docpicker').addEventListener(
    'change', 
    changeEvent => {
      changeEvent.stopPropagation();
      changeEvent.preventDefault();
        if (!fileFlag) {
            fileFlag = true;
            readJsonFile(changeEvent.target.files[0]);
            swal("Stix2Viz","File uploaded successfully.","success");
        }
        else {
            swal("Stix2Viz","There is a file arleady uploaded.\nUse the Clear button first then select a new file.","error");
        }
    },
    false
  );
  // JSON FILE READER
function readJsonFile(jsonFile) {
    let reader = new FileReader();
    reader.addEventListener('load', (loadEvent) => {
      try {
        let json = JSON.parse(loadEvent.target.result);
        let links_data=[];
        let nodes_data=[];
        for (let i = 0; i < json.objects.length; i++) {
            if (json.objects[i].type === 'relationship') {
                links_data.push(json.objects[i]);
            }
            else {
                nodes_data.push(json.objects[i]);
            }
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
        //Add forces to the simulation.
        simulation
            .force("charge_force", d3.forceManyBody().distanceMax(95).strength(-100))
            .force("center_force", d3.forceCenter(width/2 , height/2 ))
            .force("collision_force", d3.forceCollide().radius(3).strength(-1));
        //Update circle positions to reflect node updates on each tick of the simulation.
        simulation.on("tick", tickActions );
        //add encompassing group for the zoom
        let g = svg.append("g")
            .attr("class", "everything");





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





        //forceLink and link distance
        let link_force =  d3.forceLink(links_data1)
            .id(function(d) {
                return d.id; })
            .distance(60);

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



        let link = g.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(links_data1)
            .enter().append("line")
            .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
            })
            .attr("marker-end", "url(#end-arrow)");
        //Draw the circles for the nodes.
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
                else{
                    return "url(#myPattern14)";
                }
            });
          
        gNode = node;
        //add zoom capabilities
        let zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

        zoom_handler(svg);

        function zoom_actions(){
            g.attr("transform", d3.event.transform)
        }


        //Set up the drag handler.
        let drag_handler=d3.drag()
            .on("start",drag_start)
            .on("drag",drag_drag)
            .on("end",drag_end);

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

        function drag_start(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            d3.selectAll("circle").style("stroke","#625D5D");
            d3.select(this).style("stroke","   #990099");
            let neighbors=getNeighbors(d);
            for(let i=0;i<nodes_data.length;i++){
                if(neighbors.indexOf(d3.selectAll("g.nodes").nodes()[0].childNodes[i].__data__.id)==-1){
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.opacity='0.1';
                }
                else{
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.opacity='1';
                }
                if(d3.select(this)._groups[0][0].__data__.created_by_ref==d3.selectAll("g.nodes").nodes()[0].childNodes[i].__data__.id){
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.opacity='1';
                    d3.selectAll("g.nodes").nodes()[0].childNodes[i].style.stroke='#00FF00';
                }
            }

            d3.select(this).style('opacity',1);
            for(let j=0;j<links_data1.length;j++){
                if(link._groups[0][j].__data__.source.id===d.id || link._groups[0][j].__data__.target.id===d.id){
                    link._groups[0][j].style.opacity='1';
                }
                else{
                    link._groups[0][j].style.opacity='0.1';
                }
            }

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
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden')
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot1').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot1').textContent ="External Ref: "+d.external_references[0].source_name+"/"+d.external_references[0].description+"/"+d.external_references[0].external_id;
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot2').textContent = "Kill Chain Phases: "+d.kill_chain_phases[0].kill_chain_name+"/"+d.kill_chain_phases[0].phase_name;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden')
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#description').textContent = d.description;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot2').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot2').textContent = "Goals: "+d.goals;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').textContent = "Personal Motivations: " +d.personal_motivations;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').textContent = "Secondary Motivations: " +d.secondary_motivations;
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot5').textContent = "Sophistication: " +d.sophistication;
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
                document.querySelector('#List-Pivot2').textContent = "Aliases: "+d.aliases;
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot3').textContent = "Goals: "+d.goals;
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot4').textContent = "Secondary Motivations: "+d.secondary_motivations;
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:visible');
                document.querySelector('#List-Pivot5').textContent = "Resource Level: "+d.resource_level;
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
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
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
                document.querySelector('#List-Pivot3').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot4').setAttribute('style','visibility:hidden');
                document.querySelector('#List-Pivot5').setAttribute('style','visibility:hidden');
                document.querySelector('#description').textContent = "";
            }
        }
        function drag_drag(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        function drag_end(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = d.x;
            d.fy = d.y;

        }       
        //Add the drag handler on.
        drag_handler(node);

        let radius = 5;
        simulation.force("links",link_force);
        function tickActions() {
            node
                .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }
      }catch (error) {
        console.error(error);
      }
    });
    reader.readAsText(jsonFile);
}

document.getElementById('restore-button').addEventListener('click',function () {
        if (fileFlag) {
            gLink.style('opacity',1);
            gNode.style('opacity',1);
        } else {
            swal("Stix2Viz","There is no file to restore.","error");
        }

    });

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