'use strict';

angular.module('streama').controller('modalNoteCtrl', [
  '$scope', '$uibModalInstance', '$stateParams', 'apiService', 'note',
  function ($scope, $uibModalInstance, $stateParams, apiService, note) {
    $scope.loading = false;

    $scope.note = note || {};

    $scope.saveNote = function (note) {
      apiService.note.save(note).success(function (data) {
        $uibModalInstance.close(data);
     });
    };

    setTimeout(function () {
      $('.name-input').focus();
    }, 200);

    $scope.cancel = function () {
      alert($stateParams.videoId);
      $uibModalInstance.dismiss('cancel');
    };
  }]);
