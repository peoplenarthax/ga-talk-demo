const multipleObjects = {
    necklace: 4,
    'bad-light-item': 7,
    'good-light-item': 7,
    potion: 4,
    'good-medium-item': 5,
    'bad-medium-item': 6,
    rock: 3,
    'good-heavy-item': 8,
    'bad-heavy-item': 8
};

const getObjectName = objectName => {
    return multipleObjects[objectName]
        ? `${objectName}${Math.round(Math.random() * (multipleObjects[objectName] - 1))}`
        : objectName
}

const getObject = ({value, weight}) => {
    if (weight > 11) {
        if (value > 60) {
            return getObjectName('good-heavy-item');
        } else if ( value > 20) {
            return getObjectName('bad-heavy-item');
        } else if ( value > 10) {
            return getObjectName('empty-box');
        } else {
            return getObjectName('rock');
        }
    } else if (weight >= 8) {
        if (value > 80) {
            return getObjectName('gold-nugget');
        } else if ( value > 70) {
            return getObjectName('silver-nugget');
        } else if ( value > 50) {
            return getObjectName('bronze-nugget');
        } else if ( value > 30) {
            return getObjectName('good-medium-item');
        } else if ( value > 10) {
            return getObjectName('bad-medium-item');
        } else {
            return getObjectName('rock');
        }
    } else if (weight >= 4) {
        if (value > 60) {
            return getObjectName('necklace');
        } else if ( value > 30) {
            return getObjectName('good-light-item');
        } else if ( value > 10) {
            return getObjectName('bad-light-item');
        } else {
            return getObjectName('potion');
        }
    } else {
        if (value > 80) {
            return getObjectName('diamond');
        } else if ( value > 70) {
            return getObjectName('rubi');
        } else if ( value > 50) {
            return getObjectName('saphire');
        } else if ( value > 30) {
            return getObjectName('emerald');
        } else if ( value > 20) {
            return getObjectName('gold-coin');
        }else if ( value > 10) {
            return getObjectName('silver-coin');
        }else if ( value > 5) {
            return getObjectName('bronze-coin');
        } else if ( value > 3) {
            return getObjectName('bread');
        }else {
            return getObjectName('coal');
        }
    }
};




