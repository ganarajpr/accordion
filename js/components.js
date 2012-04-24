/**
 * Created with JetBrains WebStorm.
 * User: ganaraj.permunda
 * Date: 23/04/12
 * Time: 20:27
 * To change this template use File | Settings | File Templates.
 */

angular.module('components', []).
    /*directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                }

                this.addPane = function(pane) {
                    if (panes.length == 0) $scope.select(pane);
                    panes.push(pane);
                }
            },
            template:
                '<div class="tabbable">' +
                    '<ul class="nav nav-tabs">' +
                    '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
                    '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
                    '</li>' +
                    '</ul>' +
                    '<div class="tab-content" ng-transclude></div>' +
                    '</div>',
            replace: true
        };
    }).
    directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: 'bind' },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            template:
                '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                    '</div>',
            replace: true
        };
    }).*/
    directive('accordion', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                var groups = $scope.groups = [];
                var that = this;
                this.selected = function(currentGroup) {
                    angular.forEach(groups, function(group) {
                        //if( group !== currentGroup)
                        //group.close();
                        group.opened = false;
                        group.close();
                    });
                    currentGroup.opened = true;
                    currentGroup.open();
                }

                this.addGroup = function(group) {
                    if (groups.length == 0)
                    {
                        that.selected(group);
                    }
                    groups.push(group);
                }
            },
            template:
                '<div class="accordion" id="accordion2" ng-transclude>'+
                '</div>',
            replace: true
        };
    }).
    directive('group', function() {
        return {
            require: '^accordion',
            restrict: 'E',
            transclude: true,
            scope: {title:'bind'},
            link: function(scope, element, attrs, accordionCtrl) {
                // Title element
                var heading = angular.element(element.children()[0]);
                // Opened / closed state
                var opened = false;
                var toggler = angular.element(heading.children()[0]);
                var body = angular.element(element.children()[1]);
                // Clicking on title should open/close the zippy
                toggler.bind('click', clicked);
                scope.open = function()
                {
                    body.removeClass('closed');
                    //body.animate({'height:auto'},400);//addClass('in');
                    body.addClass('in');
                }
                scope.close = function()
                {
                    //body.animate({'height:0px'},400);
                    //body.slideUp(400).removeClass('in');
                    body.removeClass('in');
                    body.addClass('closed');
                }
                // Toggle the closed/opened state
                function clicked() {
                    accordionCtrl.selected(scope);
                }
                accordionCtrl.addGroup(scope);
            },
            template:
                '<div class="accordion-group">'+
                    '<div class="accordion-heading">'+
                        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="">'+
                            '{{title}}'+
                        '</a>'+
                    '</div>'+
                    '<div class="accordion-body collapse">'+
                        '<div class="accordion-inner" ng-transclude>'+

                        '</div>' +
                    ' </div>' +
                '</div>',
            replace: true
        };
    })

