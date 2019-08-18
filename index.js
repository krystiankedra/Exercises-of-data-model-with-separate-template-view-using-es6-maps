const searchKey = (key, map) => map.get(key)

const isExistKey = (key, map) => map.has(key)

const clearMap = (map) => map.clear()

const changeValueInKey = (key, value, property, map) => {
    const read = () => searchKey(key, map)

    const assignValue = () => {
        const searchedObject = read()
        searchedObject[property] = value
    }

    assignValue()
}

const concatDataModelObjectWithTemplate = (dataModel) => (field) => {
    const dataModelObject = searchKey(`${field.id}`, dataModel)
    field.value = dataModelObject.value
    return field
}

const dataModelAssignedToResponse = (dataModel, template) => template.map(concatDataModelObjectWithTemplate(dataModel))

const data = [
    { id: 1, value: 'Krystian' },
    { id: 2, value: 'Brzeski' },
    { id: 3, value: '30' },
    { id: 4, value: 'Example start description' },
    { id: 5, value: ['limit1', 'limit2', 'limit3', 'limit4'] },
    { id: 6, value: '24-02-1994' }
]

const template = [
    { id: 1, label: 'Name', fieldType: 'ShortText', value: '' },
    { id: 2, label: 'District', fieldType: 'DropdownList', value: '' },
    { id: 3, label: 'Size', fieldType: 'Number', value: '' },
    { id: 4, label: 'Description', fieldType: 'LongText', value: '' },
    { id: 5, label: 'Limits', fieldType: 'MultipleChoice', value: '' },
    { id: 6, label: 'Start date', fieldType: 'Date', value: '' }
]


const map = new Map()
data.forEach((element) => {
    map.set(`${element.id}`, element)
})

const mappedTemplateWithDataModel = dataModelAssignedToResponse(map, template)

changeValueInKey('3', '150', 'value', map)
changeValueInKey('6', '25-10-2018', 'value', map)

console.log(dataModelAssignedToResponse(map, template))