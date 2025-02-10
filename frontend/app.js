var app = angular.module("taskManagerApp", []);

app.controller("TaskController", function ($http) {
  var vm = this;
  const API_URL = "http://localhost:5001/api";
  const TASKS_URL = `${API_URL}/tasks`;
  const CATEGORIES_URL = `${API_URL}/categories`;

  vm.tasks = [];
  vm.categories = [];
  vm.selectedCategory = null;
  vm.selectedStatus = null;
  vm.showAddTaskForm = false;
  vm.showAddCategoryForm = false;

  // Load tasks from the server, optionally filtered by category and status
  vm.loadTasks = function () {
    let url = TASKS_URL;
    let params = [];

    if (vm.selectedCategory) {
      params.push("category=" + vm.selectedCategory);
    }
    if (vm.selectedStatus) {
      params.push("status=" + vm.selectedStatus);
    }

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    $http
      .get(url)
      .then(function (response) {
        vm.tasks = response.data;
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
      });
  };

  vm.taskForm = {}; 
  vm.showTaskForm = false;
  vm.editingTask = false;

  // Edit an existing task
  vm.editTask = function(task) {
    task.dueDate = new Date(task.dueDate);
    vm.taskForm = angular.copy(task); 
    vm.editingTask = true;
    vm.showTaskForm = true;
  };

  // Save the task (create or update)
  vm.saveTask = function() {
    if (vm.editingTask) {
      // Update existing task
      $http.put(`${TASKS_URL}/${vm.taskForm._id}`, vm.taskForm).then(response => {
        vm.loadTasks(); // Reload tasks
      });
    } else {
      // Create new task
      $http.post(TASKS_URL, vm.taskForm).then(response => {
        vm.loadTasks(); // Reload tasks
      });
    }
    
    vm.cancelEdit();
  };

  // Cancel editing or adding a task
  vm.cancelEdit = function() {
    vm.taskForm = {};
    vm.showTaskForm = false;
    vm.editingTask = false;
  };

  // Open the form to add a new task
  vm.openAddTaskForm = function() {
    vm.taskForm = {}; 
    vm.editingTask = false;
    vm.showTaskForm = true;
  };

  // Delete a task
  vm.deleteTask = function (id) {
    $http
      .delete(TASKS_URL + "/" + id)
      .then(function () {
        vm.loadTasks();
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
      });
  };

  // Update the status of a task
  vm.updateStatus = function (task, status) {
    $http
      .put(TASKS_URL + "/" + task._id, { status: status })
      .then(function () {
        task.status = status;
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
      });
  };

  vm.updateCategory = function (task) {
    $http
      .put(TASKS_URL + "/" + task._id, { category: task.categoryId })
      .then(function (response) {
        task.category.id = response.data.category;
        task.category.name = vm.categories.find(category => category.id === task.categoryId).name;
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
      });
  };

  // Load categories from the server
  vm.loadCategories = function() {
    $http.get(CATEGORIES_URL).then(function(response) {
      vm.categories = response.data;
    }).catch(function(error) {
      console.error("Error occurred:", error);
    });
  };

  vm.toggleAddCategoryForm = function () {
    vm.showAddCategoryForm = !vm.showAddCategoryForm;
  };

  vm.addCategory = function () {
    var newCategory = {
      name: vm.newCategoryName,
      description: vm.newCategoryDescription || "",
    };

    $http
      .post(CATEGORIES_URL, newCategory)
      .then(function (response) {
        vm.categories.push(response.data);
        vm.newCategoryName = "";
        vm.newCategoryDescription = "";
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
      });
  };

  // Initial load of tasks and categories
  vm.loadTasks();
  vm.loadCategories();
});
