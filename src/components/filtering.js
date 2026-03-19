
// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    return (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.closest('.filter-wrapper, .dropdown-select');
            if (parent) {
                const input = parent.querySelector('input, select');
                if (input) {
                    input.value = '';
                    const field = action.dataset.field;
                    if (field && state.filters) {
                        state.filters[field] = '';
                    }
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
               const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
} 
            
            // Фильтрация по покупателю (частичное совпадение)
            if (state.customer && state.customer.trim() !== '') {
                if (!row.customer.toLowerCase().includes(state.customer.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтрация по продавцу (точное совпадение из select)
            if (state.seller && state.seller.trim() !== '' && row.seller !== state.seller) {
                return false;
            }
            
            // Фильтрация по диапазону сумм - ВАЖНО: преобразуем строки в числа
            const rowTotal = parseFloat(row.total);
            
            // Проверяем totalFrom (нижняя граница)
            if (state.totalFrom && state.totalFrom.trim() !== '') {
                const minTotal = parseFloat(state.totalFrom);
                if (!isNaN(minTotal) && rowTotal < minTotal) {
                    return false;
                }
            }
            
            // Проверяем totalTo (верхняя граница)
            if (state.totalTo && state.totalTo.trim() !== '') {
                const maxTotal = parseFloat(state.totalTo);
                if (!isNaN(maxTotal) && rowTotal > maxTotal) {
                    return false;
                }
            }
            
            return true;
        
    