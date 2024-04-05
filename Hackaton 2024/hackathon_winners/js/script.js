// Updated sample event data
const events = [
    {
        title: "Meeting with Advisors",
        startTime: "2024-03-03T10:00:00",
        endTime: "2024-03-03T16:00:00",
        category: "Meeting",
        desc: "Discuss academic progress",
        location: "Student Services Building",
        campus: "Main Campus",
        going: "31",
        maybe: "5",
    },
    {
        title: "Networking Workshop",
        startTime: "2024-03-03T12:00:00",
        endTime: "2024-03-03T13:00:00",
        category: "Workshop",
        desc: "Learn networking skills",
        location: "Career Center",
        campus: "Main Campus",
        going: "22",
        maybe: "9",
    },
    {
        title: "Student Council Meeting",
        startTime: "2024-03-11T10:00:00",
        endTime: "2024-03-11T11:30:00",
        category: "Meeting",
        desc: "Discuss upcoming events",
        location: "Student Union",
        campus: "Main Campus",
        going: "2",
        maybe: "0",
    },
    {
        title: "Career Fair",
        startTime: "2024-03-12T10:00:00",
        endTime: "2024-03-12T16:00:00",
        category: "Fair",
        desc: "Explore job opportunities",
        location: "Exhibition Hall",
        campus: "Main Campus",
        going: "0",
        maybe: "1",
    },
    {
        title: "Programming Workshop",
        startTime: "2024-03-15T13:00:00",
        endTime: "2024-03-15T15:00:00",
        category: "Workshop",
        desc: "Introduction to programming",
        location: "Computer Lab",
        campus: "Main Campus",
        going: "55",
        maybe: "23",
    },
    {
        title: "Art Exhibition",
        startTime: "2024-03-20T11:00:00",
        endTime: "2024-03-20T18:00:00",
        category: "Exhibition",
        desc: "Display of local artwork",
        location: "Art Gallery",
        campus: "Main Campus",
        going: "7",
        maybe: "15",
    },
    {
        title: "Project Presentation",
        startTime: "2024-03-25T09:00:00",
        endTime: "2024-03-25T12:00:00",
        category: "Presentation",
        desc: "Presenting research project",
        location: "Conference Room A",
        campus: "Main Campus",
        going: "20",
        maybe: "12",
    },
    {
        title: "Guest Lecture",
        startTime: "2024-03-30T16:00:00",
        endTime: "2024-03-30T18:00:00",
        category: "Lecture",
        desc: "Guest speaker on environmental sustainability",
        location: "Lecture Hall",
        campus: "Main Campus",
        going: "40",
        maybe: "2",
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let appliedFilters = [];

    function renderCalendar() {
        const monthYearText = document.getElementById('month-year');
        const daysContainer = document.getElementById('days');

        // Clear previous month's days
        daysContainer.innerHTML = '';

        // Set month and year in the header
        monthYearText.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

        // Get the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startingDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Get the number of days in the month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        let dayCount = 1;
        // Create weeks (rows) for the calendar
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            // Create days (cells) for each week
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < startingDay) {
                    // Create empty cells for previous month's days
                    cell.textContent = '';
                } else if (dayCount > daysInMonth) {
                    // Create empty cells for next month's days
                    cell.textContent = '';
                } else {
                    // Create cell for current month's day
                    cell.setAttribute('data-date', `${currentYear}-${padZero(currentMonth + 1)}-${padZero(dayCount)}`);

                    // Day number at the top
                    const dayNumber = document.createElement('div');
                    dayNumber.classList.add('day-number');
                    dayNumber.textContent = dayCount;
                    cell.appendChild(dayNumber);

                    // Check if there are events for this day
                    let filteredEvents = getFilteredEvents()
                    const eventsForDay = filteredEvents.filter(event => event.startTime.includes(`${currentYear}-${padZero(currentMonth + 1)}-${padZero(dayCount)}`));
                    if (eventsForDay.length > 0) {
                        const eventContainer = document.createElement('ul');
                        eventContainer.classList.add('event-container', 'list-unstyled');

                        eventsForDay.forEach(event => {
                            const eventBadge = document.createElement('span');
                            eventBadge.classList.add('badge', 'rounded-pill', 'me-1');
                            // Apply category color
                            switch (event.category) {
                                case 'Meeting':
                                    eventBadge.classList.add('bg-danger');
                                    break;
                                case 'Workshop':
                                    eventBadge.classList.add('bg-success');
                                    break;
                                case 'Fair':
                                    eventBadge.classList.add('bg-info');
                                    break;
                                case 'Exhibition':
                                    eventBadge.classList.add('bg-primary');
                                    break;
                                case 'Presentation':
                                    eventBadge.classList.add('bg-warning');
                                    break;
                                case 'Lecture':
                                    eventBadge.classList.add('bg-secondary');
                                    break;
                                default:
                                    eventBadge.classList.add('bg-light', 'text-dark');
                            }
                            eventBadge.textContent = event.title;

                            const eventItem = document.createElement('li');
                            eventItem.appendChild(eventBadge);
                            eventContainer.appendChild(eventItem);
                        });

                        cell.appendChild(eventContainer);
                    }

                    dayCount++;
                }
                row.appendChild(cell);
            }

            daysContainer.appendChild(row);
        }

        // Event listener for hovering over a day
        const allDays = document.querySelectorAll('td');
        allDays.forEach(day => {
            day.addEventListener('mouseover', () => {
                const date = day.getAttribute('data-date');
                const eventsForDate = events.filter(event => event.startTime.includes(date));
                if (eventsForDate.length > 0) {
                    showEventPreview(day, eventsForDate);
                }
            });

            day.addEventListener('mouseout', () => {
                hideEventPreview();
            });

            day.addEventListener('click', () => {
                const date = day.getAttribute('data-date');
                const eventsForDate = events.filter(event => event.startTime.includes(date));
                if (eventsForDate.length > 0) {
                    showModal(day, eventsForDate);
                }
            });
        });
    }

    // Function to filter events based on applied filters
    function getFilteredEvents() {
        if (appliedFilters.length === 0) {
            // If no filters are applied, return an empty array
            return [];
        } else if (appliedFilters.includes('All')) {
            // If "All" is selected, return all events
            return events;
        } else {
            // If filters are applied, show events that match the applied filters
            return events.filter(event => {
                // Check if any of the event's categories match applied filters
                return appliedFilters.includes(event.category);
            });
        }
    }

    // Function to handle checkbox clicks and update applied filters
    function handleFilterCheckboxClick(checkbox) {
        const filterText = checkbox.nextElementSibling.textContent.trim(); // Get the text associated with the clicked checkbox

        if (filterText === 'All') {
            // If "All" checkbox is clicked, select or deselect all other checkboxes accordingly
            const allCheckboxChecked = checkbox.checked;
            checkboxes.forEach(function (cb) {
                cb.checked = allCheckboxChecked;
                if (allCheckboxChecked && cb !== checkbox) {
                    appliedFilters.push(cb.nextElementSibling.textContent.trim());
                } else {
                    appliedFilters = [];
                }
            });
        } else {
            // For other checkboxes
            const index = appliedFilters.indexOf(filterText);
            if (index === -1) {
                // If not applied, add it to the array
                appliedFilters.push(filterText);
            } else {
                // If applied, remove it from the array
                appliedFilters.splice(index, 1);
            }
            // If "All" checkbox is selected, uncheck it
            document.getElementById('itemAll').checked = false;
        }

        // Render the calendar with updated filters
        renderCalendar();
    }

    // Add event listeners to all checkboxes
    const checkboxes = document.querySelectorAll('.menu-content input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        // Set default state to checked for all checkboxes except "All"
        if (checkbox.id !== 'itemAll') {
            checkbox.checked = true;
            appliedFilters.push(checkbox.nextElementSibling.textContent.trim());
        }
        checkbox.addEventListener('click', function () {
            handleFilterCheckboxClick(checkbox);
        });
    });


    // Function to get month name
    function getMonthName(month) {
        const months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];
        return months[month];
    }

    // Function to go to previous month
    function previousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    }

    // Function to go to next month
    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    }

    // Function to pad single digits with 0
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    // Function to convert 24-hour format to 12-hour format (hours and minutes only)
    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':');
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${suffix}`;
    }

    function showEventPreview(day, events) {
        const eventPreview = document.getElementById('event-preview');
        const previewDate = document.getElementById('preview-date');
        const eventList = document.getElementById('event-list');

        // Get the date from the clicked day
        const dateParts = day.getAttribute('data-date').split('-');
        const year = dateParts[0];
        const monthName = getMonthName(parseInt(dateParts[1]) - 1); // Month index starts from 0
        const dayNumber = parseInt(dateParts[2]);

        // Set the preview date with year
        previewDate.textContent = `Events for ${monthName} ${dayNumber}, ${year}`;

        eventList.innerHTML = '';
        events.forEach(event => {
            // Create a Bootstrap card for each event
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3', 'text-light');

            // Determine background color based on category
            let categoryColorClass = '';
            switch (event.category.toLowerCase()) {
                case 'meeting':
                    categoryColorClass = 'bg-danger disabled';
                    break;
                case 'workshop':
                    categoryColorClass = 'bg-success disabled';
                    break;
                case 'fair':
                    categoryColorClass = 'bg-info disabled';
                    break;
                case 'exhibition':
                    categoryColorClass = 'bg-primary disabled';
                    break;
                case 'presentation':
                    categoryColorClass = 'bg-warning disabled';
                    break;
                case 'lecture':
                    categoryColorClass = 'bg-secondary disabled';
                    break;
                default:
                    categoryColorClass = 'bg-light disabled';
            }

            // Format start and end times to 12-hour format
            const startTime = formatTime(event.startTime);
            const endTime = formatTime(event.endTime);

            // Construct the card content
            card.innerHTML = `
        <div class="card-body ${categoryColorClass}">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text">${startTime} - ${endTime}</p>
            <p class="card-text">${event.desc}</p>
            <p class="card-text">Location: ${event.location}</p>
        </div>
    `;

            // Append the card to the event list
            eventList.appendChild(card);
        });

        // Show the event preview
        eventPreview.style.display = 'block';
    }

// Function to format time to 12-hour format
    function formatTime(timeString) {
        const [date, time] = timeString.split('T');
        const [hour, minute] = time.split(':');
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${suffix}`;
    }

    // Function to hide event preview
    function hideEventPreview() {
        const eventPreview = document.getElementById('event-preview');
        eventPreview.style.display = 'none';
    }

    function showModal(day, eventsForDay) {
        const eventsAccordion = document.getElementById('eventsAccordion');

        // Clear any existing content in the accordion
        eventsAccordion.innerHTML = '';

        eventsForDay.forEach((event, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');

            // Splitting the start and end dates
            const startDateParts = event.startTime.split('T');
            const endDateParts = event.endTime.split('T');

            // Creating new properties for starttime, endtime, and date
            const start = convertTo12HourFormat(startDateParts[1]);
            const end = convertTo12HourFormat(endDateParts[1]);
            const date = startDateParts[0];

            const accordionHeader = `
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
                    ${event.title}
                </button>
            </h2>
        `;

            const accordionCollapse =
                `<div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#eventsAccordion">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-4">
                                <h3>${date}</h3>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <h2><strong>${event.title}</strong></h2>
                                <p>${event.desc}</p>
                            </div>
                        </div>
                        <div class="row mt-3"> <!-- Added margin top -->
                            <hr class="w-100"> <!-- Horizontal line separating expanded content with full width -->
                            <!-- RSVP Buttons (Not Functional) -->
                            <div class="btn-group mt-3" role="group" aria-label="RSVP Buttons"> <!-- Added margin top -->
                                <button type="button" class="btn btn-outline-success"><i class="fas fa-check"></i> Going</button>
                                <button type="button" class="btn btn-outline-warning"><i class="fas fa-question"></i> Maybe</button>
                                <button type="button" class="btn btn-outline-danger"><i class="fas fa-times"></i> Not Going</button>
                                <button type="button" class="btn btn-outline-primary"><i class="fas fa-share"></i> Share</button>
                            </div>
                        </div>
                        <div class="row mt-3"> <!-- Added margin top -->
                            <div class="col-md-12 col-lg-6 mt-2">
                                <p><i class="far fa-clock"></i> Time: ${start} - ${end}</p>
                                <p><i class="fas fa-map-marker-alt"></i> Location: ${event.location}</p>
                            </div>
                            <div class="col-md-12 col-lg-6 mt-2">
                                <p><i class="fas fa-check"></i> Going: ${event.going}</p>
                                <p><i class="fas fa-question"></i> Maybe: ${event.maybe}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            accordionItem.innerHTML = accordionHeader + accordionCollapse;
            eventsAccordion.appendChild(accordionItem);
        });

        // Show the modal after populating content
        const rsvpModal = new bootstrap.Modal(document.getElementById('rsvpModal'));
        rsvpModal.show();
    }


    // Initial render
    renderCalendar();
});
