
const margin = { top: 40, right: 30, bottom: 60, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tooltip = d3.select("body").append("div")
    .attr("id", "tooltip");

const jitterWidth = 30;
const jitter = () => (Math.random() - 0.5) * jitterWidth;

const scenes = [
    {
        title: "The Gas Engine Rule",
        description: "For traditional gasoline engines we can see that as the number of engine cylinders increases, the fuel efficiency drops significantly.",
        annotation: {
            note: { title: "The Efficiency Trade-Off", label: "The downward trend is the basic trade off with gas engines" },
            x: 500, y: 150, dx: 50, dy: 30
        }
    },
    {
        title: "The Extremes of the Rule",
        description: "This rule is most obvious when you look at the extremes. You can see that the 4 cylinder cars have consistenly higher MPG, while the powerful 8-12 cylinder cars have consistently lower MPG.",
        annotation: {
            note: { title: "A Clear Contrast", label: "The most and least efficient gasoline cars can be predicted by their cylinder count" },
            x: 400, y: 100, dx: 50, dy: 50
        }
    },
    {
        title: "Breaking the Rule: Electric Vehicles",
        description: "You may have noticed that earlier we filtered out electric vehicles. But what if we include them? Electric cars have no cylinders, and they achieve high MPG ratings without the limitations of the regular gas engine.",
        annotation: {
            note: { title: "A New Era", label: "Electric cars achieve high MPG and don't have the limitations of a gas engine (also better for environment)" },
            x: 100, y: 50, dx: 50, dy: 20
        }
    }
];

let currentScene = 0;


d3.csv("cars2017.csv", d => {
    d.EngineCylinders = +d["EngineCylinders"];
    d.AverageHighwayMPG = +d["AverageHighwayMPG"];
    d.Fuel = d["Fuel"];
    d.Make = d["Make"];
    return d;
}).then(data => {
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.EngineCylinders) - 1, d3.max(data, d => d.EngineCylinders) + 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.AverageHighwayMPG) + 10])
        .range([height, 0]);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    svg.append("text").attr("class", "axis-label").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height + margin.bottom - 10).text("Engine Cylinders");
    svg.append("text").attr("class", "axis-label").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", -margin.left + 20).text("Average Highway MPG");

    const dots = svg.selectAll(".dot")
        .data(data, d => d.Make)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.EngineCylinders) + jitter())
        .attr("cy", d => y(d.AverageHighwayMPG))
        .attr("r", 5); 

    dots.on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`<strong>${d.Make}</strong><br/>Cylinders: ${d.EngineCylinders}<br/>Highway MPG: ${d.AverageHighwayMPG}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }).on("mouseout", d => {
        tooltip.transition().duration(500).style("opacity", 0);
    });

    function updateScene(sceneIndex) {
        const scene = scenes[sceneIndex];

        d3.select("#scene-title").text(scene.title);
        d3.select("#scene-description").text(scene.description);

        dots.transition()
            .duration(750)
            .delay((d, i) => i * 3) 
            
            .attr("r", d => {
                if (sceneIndex === 1 && (d.EngineCylinders === 4 || d.EngineCylinders >= 8)) return 7;
                if (sceneIndex === 2 && d.EngineCylinders === 0) return 8;
                return 5; 
            })

            .style("fill", d => {
                if (sceneIndex === 1) {
                    if (d.EngineCylinders === 4) return "steelblue";
                    if (d.EngineCylinders >= 8) return "darkred";
                }
                if (sceneIndex === 2 && d.EngineCylinders === 0) {
                    return "green";
                }
                return "gray";
            })

            .style("opacity", d => {
                if (sceneIndex === 0) {
                    return d.Fuel === "Gasoline" ? 0.7 : 0.05;
                }
                if (sceneIndex === 1) {
                    return (d.EngineCylinders === 4 || d.EngineCylinders >= 8) ? 0.9 : 0.1;
                }
                if (sceneIndex === 2) {
                    return d.EngineCylinders === 0 ? 0.9 : 0.1;
                }
            });
        
        svg.selectAll(".annotation-group").remove();
        const makeAnnotations = d3.annotation().annotations([scene.annotation]);
        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        d3.select("#prev-button").property("disabled", sceneIndex === 0);
        d3.select("#next-button").property("disabled", sceneIndex === scenes.length - 1);
    }

    d3.select("#next-button").on("click", () => {
        if (currentScene < scenes.length - 1) {
            currentScene++;
            updateScene(currentScene);
        }
    });

    d3.select("#prev-button").on("click", () => {
        if (currentScene > 0) {
            currentScene--;
            updateScene(currentScene);
        }
    });

    updateScene(0);

}).catch(error => {
    console.error("Error loading the data: ", error);
});