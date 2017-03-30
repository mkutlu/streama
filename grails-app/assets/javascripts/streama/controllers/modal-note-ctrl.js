'use strict';

angular.module('streama').controller('modalNoteCtrl', [
  '$scope', '$uibModalInstance', '$stateParams', 'apiService', 'note','databaseParams',
  function ($scope, $uibModalInstance, $stateParams, apiService, note, databaseParams ) {
    $scope.loading = false;
    $scope.note = note || {};
    //alert(databaseParams.time+" "+databaseParams.title+" "+databaseParams.userId);
    $scope.note.videoId = $stateParams.videoId;
    $scope.note.noteTime = databaseParams.time;
    $scope.note.userId = databaseParams.userId;
    $scope.saveNote = function (note) {
      note.videoId = $stateParams.videoId;
      note.noteTime = databaseParams.time;
      note.userId = databaseParams.userId;
      apiService.note.save(note).success(function (data) {
        $uibModalInstance.close(data);
     });
    };

    setTimeout(function () {
      $('.name-input').focus();
    }, 200);

    $scope.getVideoTitle = function () {
      return databaseParams.title;
    }
    $scope.cancel = function () {
      //alert($stateParams.videoId);
      $uibModalInstance.dismiss('cancel');
    };
  }]);
