// Dashboard data (from provided JSON)
const dashboardData = {
    "teachers": [{"name": "Justin deHaan", "success_count": 267, "error_count": 2, "total": 269, "success_rate": 99.26}, {"name": "Bruce Girouard", "success_count": 100, "error_count": 0, "total": 100, "success_rate": 100.0}, {"name": "Sarah Cammer", "success_count": 13, "error_count": 0, "total": 13, "success_rate": 100.0}, {"name": "Angelo Papia", "success_count": 26, "error_count": 0, "total": 26, "success_rate": 100.0}, {"name": "Dylan English", "success_count": 4, "error_count": 0, "total": 4, "success_rate": 100.0}, {"name": "Brandi Carpenter", "success_count": 2, "error_count": 0, "total": 2, "success_rate": 100.0}, {"name": "Jennifer Ganley", "success_count": 94, "error_count": 3, "total": 97, "success_rate": 96.91}, {"name": "Tim Jones", "success_count": 189, "error_count": 11, "total": 200, "success_rate": 94.5}, {"name": "Emily Kotwal", "success_count": 60, "error_count": 4, "total": 64, "success_rate": 93.75}, {"name": "Michael Poe", "success_count": 129, "error_count": 10, "total": 139, "success_rate": 92.81}, {"name": "Erik Synnestvedt", "success_count": 46, "error_count": 4, "total": 50, "success_rate": 92.0}, {"name": "Sarika Ozarkar", "success_count": 24, "error_count": 3, "total": 27, "success_rate": 88.89}, {"name": "Anne Marie Guanci", "success_count": 8, "error_count": 1, "total": 9, "success_rate": 88.89}, {"name": "Erin Bordeau", "success_count": 106, "error_count": 14, "total": 120, "success_rate": 88.33}, {"name": "Jamie McDonough", "success_count": 14, "error_count": 3, "total": 17, "success_rate": 82.35}, {"name": "Allison Barry", "success_count": 10, "error_count": 3, "total": 13, "success_rate": 76.92}, {"name": "Tristin OConnor", "success_count": 6, "error_count": 2, "total": 8, "success_rate": 75.0}, {"name": "Abigail Mutschler", "success_count": 153, "error_count": 55, "total": 208, "success_rate": 73.56}, {"name": "Amanda Valenzuela", "success_count": 16, "error_count": 8, "total": 24, "success_rate": 66.67}, {"name": "Andrew Bradley", "success_count": 42, "error_count": 28, "total": 70, "success_rate": 60.0}, {"name": "Robert Flynn", "success_count": 141, "error_count": 113, "total": 254, "success_rate": 55.51}, {"name": "Alex Peters", "success_count": 9, "error_count": 8, "total": 17, "success_rate": 52.94}, {"name": "Rebecca Maynard", "success_count": 4, "error_count": 4, "total": 8, "success_rate": 50.0}, {"name": "James McNamara", "success_count": 42, "error_count": 52, "total": 94, "success_rate": 44.68}, {"name": "Kristen Kenney", "success_count": 1, "error_count": 29, "total": 30, "success_rate": 3.33}, {"name": "Aislin Moylan", "success_count": 0, "error_count": 3, "total": 3, "success_rate": 0.0}],
    "daily_trends": [{"date": "2025-09-19", "assignment_success": 110, "assignment_errors": 23, "submission_success": 133, "submission_errors": 23}, {"date": "2025-09-20", "assignment_success": 69, "assignment_errors": 10, "submission_success": 139, "submission_errors": 48}, {"date": "2025-09-21", "assignment_success": 1, "assignment_errors": 1, "submission_success": 0, "submission_errors": 0}, {"date": "2025-09-22", "assignment_success": 46, "assignment_errors": 51, "submission_success": 1020, "submission_errors": 358}, {"date": "2025-09-23", "assignment_success": 180, "assignment_errors": 32, "submission_success": 1646, "submission_errors": 283}, {"date": "2025-09-24", "assignment_success": 89, "assignment_errors": 22, "submission_success": 1555, "submission_errors": 306}, {"date": "2025-09-25", "assignment_success": 101, "assignment_errors": 7, "submission_success": 1588, "submission_errors": 102}, {"date": "2025-09-26", "assignment_success": 77, "assignment_errors": 12, "submission_success": 1189, "submission_errors": 52}],
    "problem_assignments": [{"assignment_name": "Measurement In Real Life", "teacher_name": "Andrew Bradley", "success_count": 3, "error_count": 6, "error_message": "given GradebookColumnType does not have a default GradeScale"}, {"assignment_name": "Performance Task", "teacher_name": "Robert Flynn", "success_count": 2, "error_count": 6, "error_message": "given GradebookColumnType does not have a default GradeScale"}, {"assignment_name": "wk 3 Do Now.", "teacher_name": "Abigail Mutschler", "success_count": 2, "error_count": 3, "error_message": "given GradebookColumnType does not have a default GradeScale"}],
    "error_types": [{"type": "GradebookColumnType Error", "count": 290, "description": "Missing default GradeScale configuration"}, {"type": "Duplicate Assignment", "count": 31, "description": "Assignment name already exists for class"}, {"type": "Missing GradebookColumn", "count": 1168, "description": "No GradebookColumnDefinition found"}, {"type": "Session Expired", "count": 5, "description": "Authentication session has expired"}, {"type": "No GradeTermDates", "count": 4, "description": "Missing grade term configuration"}],
    "summary": {"total_assignments": 1866, "assignment_success_rate": 80.7, "total_submissions": 8442, "submission_success_rate": 86.1, "last_updated": "2025-09-28 21:00:00"}
};

// Global variables
let currentTeacher = 'all';
let currentPeriod = 'all';
let charts = {};

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure loading overlay is hidden initially
    hideLoadingOverlay();
    initializeDashboard();
});

function initializeDashboard() {
    populateTeacherDropdown();
    updateMetrics();
    populateTables();
    
    // Initialize charts after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeCharts();
    }, 100);
    
    bindEventHandlers();
}

function populateTeacherDropdown() {
    const select = document.getElementById('teacher-select');
    
    // Clear existing options except the first one
    while (select.children.length > 1) {
        select.removeChild(select.lastChild);
    }
    
    // Sort teachers by name for better UX
    const sortedTeachers = [...dashboardData.teachers].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedTeachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.name;
        option.textContent = teacher.name;
        select.appendChild(option);
    });
}

function updateMetrics(selectedTeacher = null) {
    let data = dashboardData.summary;
    
    if (selectedTeacher && selectedTeacher !== 'all') {
        const teacher = dashboardData.teachers.find(t => t.name === selectedTeacher);
        if (teacher) {
            data = {
                total_assignments: teacher.total,
                assignment_success_rate: teacher.success_rate,
                total_submissions: teacher.total, // Simplified for demo
                submission_success_rate: teacher.success_rate
            };
        }
    }

    // Update header stats
    document.getElementById('overall-success-rate').textContent = `${data.assignment_success_rate}%`;
    
    // Update teacher stats
    document.getElementById('teacher-assignments').textContent = data.total_assignments.toLocaleString();
    document.getElementById('teacher-success-rate').textContent = `${data.assignment_success_rate}%`;
    
    // Update metric cards
    document.getElementById('assignment-success-rate').textContent = `${data.assignment_success_rate}%`;
    document.getElementById('total-assignments').textContent = data.total_assignments.toLocaleString();
    document.getElementById('total-submissions').textContent = dashboardData.summary.total_submissions.toLocaleString();
    
    // Update status color based on success rate
    const statusElement = document.getElementById('assignment-status');
    const rate = data.assignment_success_rate;
    let statusClass = '';
    let statusText = '';
    
    if (rate >= 90) {
        statusClass = 'status--success';
        statusText = 'Excellent';
    } else if (rate >= 70) {
        statusClass = 'status--warning';
        statusText = 'Good';
    } else {
        statusClass = 'status--error';
        statusText = 'Needs Attention';
    }
    
    statusElement.className = `status ${statusClass}`;
    statusElement.textContent = statusText;
}

function populateTables() {
    populateProblemAssignments();
    populateErrorAnalysis();
    populateRecentActivity();
}

function populateProblemAssignments() {
    const tbody = document.querySelector('#problem-assignments-table tbody');
    tbody.innerHTML = '';
    
    dashboardData.problem_assignments.forEach(assignment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${assignment.assignment_name}</td>
            <td>${assignment.teacher_name}</td>
            <td class="status-success">${assignment.success_count}</td>
            <td class="status-error">${assignment.error_count}</td>
            <td>${assignment.error_message}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateErrorAnalysis() {
    const container = document.getElementById('error-types-list');
    container.innerHTML = '';
    
    dashboardData.error_types.forEach(errorType => {
        const item = document.createElement('div');
        item.className = 'error-type-item';
        item.innerHTML = `
            <div class="error-type-info">
                <div class="error-type-name">${errorType.type}</div>
                <p class="error-type-description">${errorType.description}</p>
            </div>
            <div class="error-type-count">${errorType.count}</div>
        `;
        container.appendChild(item);
    });
}

function populateRecentActivity() {
    const tbody = document.querySelector('#recent-activity-table tbody');
    tbody.innerHTML = '';
    
    // Sort by date descending
    const sortedDays = [...dashboardData.daily_trends].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedDays.forEach(day => {
        const totalAssignments = day.assignment_success + day.assignment_errors;
        const successRate = totalAssignments > 0 ? ((day.assignment_success / totalAssignments) * 100).toFixed(1) : '0.0';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(day.date)}</td>
            <td class="status-success">${day.assignment_success}</td>
            <td class="status-error">${day.assignment_errors}</td>
            <td class="status-success">${day.submission_success}</td>
            <td class="status-error">${day.submission_errors}</td>
            <td>${successRate}%</td>
        `;
        tbody.appendChild(row);
    });
}

function initializeCharts() {
    createDailyTrendsChart();
    createTeacherPerformanceChart();
    createStatusBreakdownChart();
}

function createDailyTrendsChart() {
    const ctx = document.getElementById('daily-trends-chart').getContext('2d');
    
    const sortedData = [...dashboardData.daily_trends].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    charts.dailyTrends = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedData.map(d => formatDate(d.date)),
            datasets: [
                {
                    label: 'Assignment Success',
                    data: sortedData.map(d => d.assignment_success),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Assignment Errors',
                    data: sortedData.map(d => d.assignment_errors),
                    borderColor: '#DB4545',
                    backgroundColor: 'rgba(219, 69, 69, 0.1)',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createTeacherPerformanceChart() {
    const ctx = document.getElementById('teacher-performance-chart').getContext('2d');
    
    // Show top 10 teachers by total assignments
    const topTeachers = [...dashboardData.teachers]
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
    
    charts.teacherPerformance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topTeachers.map(t => t.name),
            datasets: [
                {
                    label: 'Success Rate (%)',
                    data: topTeachers.map(t => t.success_rate),
                    backgroundColor: topTeachers.map(t => {
                        if (t.success_rate >= 90) return '#1FB8CD';
                        if (t.success_rate >= 70) return '#FFC185';
                        return '#DB4545';
                    })
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createStatusBreakdownChart() {
    const ctx = document.getElementById('status-breakdown-chart').getContext('2d');
    
    const totalSuccess = dashboardData.teachers.reduce((sum, t) => sum + t.success_count, 0);
    const totalErrors = dashboardData.teachers.reduce((sum, t) => sum + t.error_count, 0);
    
    charts.statusBreakdown = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Successful', 'Errors'],
            datasets: [{
                data: [totalSuccess, totalErrors],
                backgroundColor: ['#1FB8CD', '#DB4545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function bindEventHandlers() {
    // Teacher selection
    const teacherSelect = document.getElementById('teacher-select');
    teacherSelect.addEventListener('change', function(e) {
        currentTeacher = e.target.value;
        
        updateMetrics(currentTeacher);
        updateChartsForTeacher(currentTeacher);
        
        // Visual feedback
        console.log(`Selected teacher: ${currentTeacher}`);
    });
    
    // Time period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
            updateDailyTrendsChart();
        });
    });
    
    // Refresh data button
    document.getElementById('refresh-data').addEventListener('click', function() {
        showLoadingOverlay();
        
        // Simulate data refresh
        setTimeout(() => {
            hideLoadingOverlay();
            // Update last updated time
            const now = new Date();
            document.getElementById('last-updated').textContent = now.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            // Show success message briefly
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓</span> Updated';
            btn.classList.add('btn--success');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn--success');
            }, 2000);
            
        }, 1500);
    });
    
    // Export buttons
    document.getElementById('export-problems').addEventListener('click', () => exportTable('problem-assignments-table', 'problem_assignments.csv'));
    document.getElementById('export-activity').addEventListener('click', () => exportTable('recent-activity-table', 'recent_activity.csv'));
}

function updateChartsForTeacher(teacherName) {
    if (teacherName === 'all') {
        // Reset to all data
        updateDailyTrendsChart();
        return;
    }
    
    // For demo purposes, we're keeping the same trend data
    // In a real application, this would filter data specific to the teacher
    updateDailyTrendsChart();
}

function updateDailyTrendsChart() {
    if (!charts.dailyTrends) return;
    
    let filteredData = [...dashboardData.daily_trends];
    
    // Apply time period filter
    if (currentPeriod !== 'all') {
        const days = parseInt(currentPeriod);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        filteredData = filteredData.filter(d => new Date(d.date) >= cutoffDate);
    }
    
    const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    charts.dailyTrends.data.labels = sortedData.map(d => formatDate(d.date));
    charts.dailyTrends.data.datasets[0].data = sortedData.map(d => d.assignment_success);
    charts.dailyTrends.data.datasets[1].data = sortedData.map(d => d.assignment_errors);
    charts.dailyTrends.update();
}

function showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function exportTable(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    let csv = [];
    
    // Get headers
    const headerRow = table.querySelector('thead tr');
    if (headerRow) {
        const headers = Array.from(headerRow.querySelectorAll('th')).map(th => th.textContent.trim());
        csv.push(headers.join(','));
    }
    
    // Get data rows
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => {
            // Clean up cell text and wrap in quotes if contains comma
            let text = td.textContent.trim().replace(/"/g, '""');
            return text.includes(',') ? `"${text}"` : text;
        });
        csv.push(cells.join(','));
    });
    
    // Create and trigger download
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url);
    
    // Show success feedback
    const exportBtn = document.getElementById(tableId.includes('problem') ? 'export-problems' : 'export-activity');
    if (exportBtn) {
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Downloaded!';
        exportBtn.classList.add('btn--success');
        
        setTimeout(() => {
            exportBtn.textContent = originalText;
            exportBtn.classList.remove('btn--success');
        }, 2000);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}