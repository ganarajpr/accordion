
var master = {
    width:200,
    height:100,
    getCombined:function()
    {
        return parseInt(this.width)+parseInt(this.height);
    }
};

function AlbumCtrl($scope)
{
    $scope.master = master;
}

function EditCtrl($scope)
{
    $scope.master = master;
}