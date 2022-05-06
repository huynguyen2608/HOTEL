import { QualityRoom } from "../../../Constances/const";

const random = () => Math.floor(Math.random() * 255);

function RandomRGBColor(option = "border") {
    if (option === "background") {
        return `rgb(${random()}, ${random()}, ${random()}, 0.6)`;
    }
    return `rgb(${random()}, ${random()}, ${random()})`;
}

function RandomAmount() {
    const faker = [...Array(7)].map((_,i) => {
        const n = Math.floor(Math.random() * 100) ;
        return n;
    })
    return faker;
}

export function ConvertChartData(data, type) {
    const keys = Object.keys(data).map(k => {
        const q = QualityRoom.find(obj => obj.value === k);
        return q.label;
    });

    const convertKey = (string) => {
        const q = QualityRoom.find(obj => obj.label === string);
        return q.value;
    }

    // let docs = {};
    // Object.entries(data).forEach(el => {
    //     const [ key, value ] = el;
    //     docs = { ...docs, 
    //         [key] : {
    //             amount : [],
    //             total : []
    //         }
    //     }
    //     docs[key]["amount"] = value.map(v => v.amount);
    //     docs[key]["total"] = value.map(v => v.total);
    // })
    if (type === "total") {
        const datasets = keys.map(k => {
            return {
                label: k,
                data: data[convertKey(k)].total,
                // data: RandomAmount(),
                borderColor: RandomRGBColor("border"),
                backgroundColor: RandomRGBColor("background")
            }
        })
        return datasets;
    }
    const datasets = keys.map(k => {
        return {
            label: k,
            data: data[convertKey(k)].amount,
            //data: RandomAmount(),
            borderColor: RandomRGBColor("border"),
            backgroundColor: RandomRGBColor("background")
        }
    })
    return datasets;
}
