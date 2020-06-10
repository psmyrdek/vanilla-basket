// Root container

const rootElem = document.querySelector('.app')

// Utils

const randomId = () => `item-${Math.round(Math.random() * 10000)}`

const formatPrice = (total) => `Total: ${total}$`

// State - Only business logic, can be tested in isolation

const basket = {
    items: [],
    addItem() {
        this.items = [...this.items, {
            id: randomId(),
            qty: 0,
            price: 0,
            title: ''
        }]
    },
    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id)
    },
    getTotal() {
        return this.items.reduce((acc, next) => { return acc += next.qty * next.price }, 0)
    },
    isEmpty() {
        return this.items.length === 0
    }
}

// Presentation - Glue between raw state (basket) and the browser
// No basket management happens here - everything is delegated to basket object

function renderApp(basket, rootElem) {
    renderItems(basket, rootElem)
    renderTotal(basket, rootElem)
    renderInterface(basket, rootElem)
}

function renderItems(basket, rootElem) {
    const itemsRoot = refreshItemsRoot(rootElem)
    basket.items.forEach(item => {
        renderItem(item, itemsRoot, rootElem)
    })
}

function renderItem(item, itemsRoot) {
    const itemWrapper = document.createElement('div')
    itemWrapper.classList.add('item')

    const titleInput = document.createElement('input')
    titleInput.classList.add('input')
    titleInput.setAttribute('placeholder', 'Product name')

    const qtyInput = document.createElement('input')
    qtyInput.classList.add('input')
    qtyInput.setAttribute('placeholder', 'Quantity')

    const priceInput = document.createElement('input')
    priceInput.classList.add('input')
    priceInput.setAttribute('placeholder', 'Price')

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('input')
    removeBtn.textContent = 'Remove'
    removeBtn.addEventListener('click', () => {
        basket.removeItem(item.id)
        renderItems(basket, rootElem, rootElem)
    })

    itemWrapper.append(titleInput, qtyInput, priceInput, removeBtn)
    itemsRoot.appendChild(itemWrapper)
}

function renderTotal(basket, rootElem) {
    const totalElem = document.createElement('div')
    totalElem.classList.add('total')
    totalElem.textContent = formatPrice(basket.getTotal())
    rootElem.appendChild(totalElem)
}

function refreshItemsRoot(rootElem) {
    const itemsRootSelector = '.items-root'
    if (!rootElem.querySelector(itemsRootSelector)) {
        const itemsRoot = document.createElement('div')
        itemsRoot.classList.add('items-root')
        rootElem.appendChild(itemsRoot)
        return itemsRoot
    } else {
        const itemsRoot = rootElem.querySelector(itemsRootSelector)
        itemsRoot.innerHTML = ''
        return itemsRoot
    }
    
}

function renderInterface(basket, rootElem) {
    const newItemBtn = document.createElement('button')
    newItemBtn.textContent = 'Add'
    newItemBtn.addEventListener('click', () => {
        basket.addItem()
        renderItems(basket, rootElem)
    })
    rootElem.appendChild(newItemBtn);
}

// Init

renderApp(basket, rootElem)