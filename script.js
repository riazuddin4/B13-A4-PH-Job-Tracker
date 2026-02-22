let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');


function calculateCount() {
    total.innerText = allCardSection.children.length //3
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

calculateCount()

// step 1;
function toggleStyle(id) {
    // adding gray bg for all
    allFilterBtn.classList.add('bg-gray-300', 'text-black')
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black')
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-black', 'text-white')
    interviewFilterBtn.classList.remove('bg-black', 'text-white')
    rejectedFilterBtn.classList.remove('bg-black', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)//this is the button that clicked for filter

    currentStatus = id
    console.log(currentStatus);
    // console.log(selected);

    // adding black bg for current button
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-black', 'text-white')
    // step 1 finish

    // show and hidden particular section
    // step 4 start
    // filtering while clicking the filter button (All, interview, rejected)
    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected()
    }
}


// step 2 delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText
        const latinName = parenNode.querySelector('.latinName').innerText

        parenNode.querySelector('.status').innerText = 'Interview'

        const cardInfo = {
            plantName,
            light,
            latinName,
            status: 'Interview',
            notes
        }

        const plantExist = interviewList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            interviewList.push(cardInfo)
        }

        // step 2 finish
        // removing the plant from Rejected list
        rejectedList = rejectedList.filter(item => item.plantName != cardInfo.plantName)

        // after remove rerender the html
        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }

        calculateCount()


    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText
        const latinName = parenNode.querySelector('.latinName').innerText

        parenNode.querySelector('.status').innerText = 'Rejected'

        const cardInfo = {
            plantName,
            light,
            latinName,
            status: 'Rejected',
            notes
        }

        const plantExist = rejectedList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            rejectedList.push(cardInfo)
        }

        // removing the plant from Interview list
        interviewList = interviewList.filter(item => item.plantName != cardInfo.plantName)

        // console.log(InterviewList);

        // after remove rerender the html
        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount()

    }


    else if (event.target.classList.contains('btn-delete')) {

        const parentNode = event.target.closest('.card');

        const plantName = parentNode.querySelector('.plantName').innerText;

        // Remove from interview list
        interviewList = interviewList.filter(item => item.plantName !== plantName);

        // Remove from rejected list
        rejectedList = rejectedList.filter(item => item.plantName !== plantName);

        // Remove from DOM
        parentNode.remove();

        calculateCount();

        // Re-render filtered section if needed
        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
    }

})

// step 3  html file create
function renderInterview() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''
    if (interviewList.length === 0) {
        filterSection.innerHTML = `
      <div class="card w-96 mx-auto text-center grid justify-center items-center py-5">
        <figure class="grid justify-center">
            <img src="./jobs.png"/>
        </figure>
        <div class="card-body space-y-5">
            <h2 class="card-title font-bold text-4xl">No jobs available</h2>
            <p>Check back soon for new job opportunities</p>
        </div>
    </div>`
    }
    // crating innerHtml
    for (let inter of interviewList) {
        console.log(inter);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${inter.plantName}</p>
                        <p class="latinName">${inter.latinName}</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">${inter.light}</p>
                        
                    </div>
                    <!-- part 3 -->
                     <p class="status">${inter.status}</p>
                     <p class="notes">${inter.notes}</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

function renderRejected() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

     
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
      <div class="card w-96 mx-auto text-center grid justify-center items-center py-5">
        <figure class="grid justify-center">
            <img src="./jobs.png"/>
        </figure>
        <div class="card-body space-y-5">
            <h2 class="card-title font-bold text-4xl">No jobs available</h2>
            <p>Check back soon for new job opportunities</p>
        </div>
    </div>`
    }
    // crating innerHtml
    for (let reject of rejectedList) {
        console.log(reject);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${reject.plantName}</p>
                        <p class="latinName">${reject.latinName}</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">${reject.light}</p>
                        
                    </div>
                    <!-- part 3 -->
                     <p class="status">${reject.status}</p>
                     <p class="notes">${reject.notes}</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

