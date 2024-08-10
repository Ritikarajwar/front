document.addEventListener('DOMContentLoaded', () => {
    fetch('https://resort-myapi.onrender.com')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data)
        })
        .catch(error => console.error('Error fetching data:', error))
    
    function setData(waterParkData) {
        const tbody = document.querySelector('#waterParkTable tbody')
        tbody.innerHTML = ''
        waterParkData.forEach(park => {
            const row = document.createElement('tr')
            row.setAttribute('data-id', park.id) 

            const idCell = document.createElement('td')
            idCell.textContent = park.id
            row.appendChild(idCell)

            const nameCell = document.createElement('td')
            nameCell.textContent = park.name
            row.appendChild(nameCell)

            const locationCell = document.createElement('td')
            locationCell.textContent = park.location
            row.appendChild(locationCell)

            const timeCell = document.createElement('td')
            timeCell.textContent = `${park.time.starttime} - ${park.time.endtime}`
            row.appendChild(timeCell);

            const feesCell = document.createElement('td')
            feesCell.textContent = `Adult: ${park.fees.adultfees}, Child: ${park.fees.childfees}`
            row.appendChild(feesCell)

            const descriptionCell = document.createElement('td')
            descriptionCell.textContent = park.description
            row.appendChild(descriptionCell)

            const imagesCell = document.createElement('td')

   
            if (Array.isArray(park.images) && park.images.length > 0) {
                park.images.forEach(imageUrl => {
                    const img = document.createElement('img')
                    img.src = imageUrl
                    imagesCell.appendChild(img)
                })
            } else {
                const img = document.createElement('img')
                img.src = "https://th.bing.com/th/id/OIP.H5fnS0juRxxh_dzA9HdeUAHaE8?w=301&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                imagesCell.appendChild(img)
            }
        
            imagesCell.className = 'images'
            row.appendChild(imagesCell)

            const actionsCell = document.createElement('td')
            const updateButton = document.createElement('button')
            updateButton.textContent = 'Update'
            updateButton.onclick = () => updatePark(park.id)
            actionsCell.appendChild(updateButton)

            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete'
            deleteButton.onclick = () => deletePark(park.id)
            actionsCell.appendChild(deleteButton)

            row.appendChild(actionsCell)

            tbody.appendChild(row)
        });
    }

    function updatePark(id) {
        alert(`Update park with ID: ${id}`)
        // Implement update logic here
    }

    function deletePark(id) {
        if (confirm(`Are you sure you want to delete the park with ID: ${id}?`)) {
            fetch(`https://resort-myapi.onrender.com/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete park')
                }
                return response.json()
            })
            .then(data => {
                console.log(`Park with ID: ${id} has been deleted`, data)
                
                // Remove the row with the specific data-id attribute
                const row = document.querySelector(`#waterParkTable tbody tr[data-id="${id}"]`)
                if (row) {
                    row.remove()
                }
            })
            .catch(error => console.error('Error deleting park:', error))
        }
    }
    
})
