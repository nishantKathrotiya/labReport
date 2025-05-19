const floorMapping = {
    first: [104, 105, 107, 108, 109, 110, 114, 116, 118,123,124,125,126],
    second: [204, 205, 206, 207,208,209,2120,211,217,219,222,223,224,225,229],
    third: [303, 304, 306, 307, 312,313,314,316,317,318,320,322,323,324,325,329],
};

const technicianMapping = {
    first: [
        { name: 'Minesh Patel', email: 'mineshpatel.dit@charusat.ac.in' },
    ],
    second: [
        { name: 'test2', email: 'vivekpate.ce@charusat.ac.in' },
        { name: 'test3', email: 'kalpeshpatel.ce@charusat.ac.in' }
    ],
    third: [
        { name: 'test4', email: 'kaushikpatel.ee@charusat.ac.in' }
    ]
};

const getTechniciansByLabNumber = (labNumber) => {
    labNumber = parseInt(labNumber);

    for (const [floor, labs] of Object.entries(floorMapping)) {
        if (labs.includes(labNumber)) {
            return {
                technicians: technicianMapping[floor]
            };
        }
    }

    return {
        technicians: []
    };
};

module.exports = { getTechniciansByLabNumber };
