App.controller('ProfilController', function($scope, Auth, Mojang, Game_account, Game){

	console.log('ProfilController');

	$scope.form_minecraft = {
		mail: "",
		password: ""
	};
	$scope.errors_minecraft = [];
	$scope.games = [];

	function initForm(){
		$scope.form_minecraft = {
			mail: "",
			password: ""
		};
		$scope.errors_minecraft = [];
	}

	function refresh(){
		$scope.games = [];
		if(Auth.isAuthenticated()){
			$scope.current_user = Auth.getUser();
			Game.getGames().then(function(response_games){
				if(response_games.status==200){
					Game_account.getGameAccounts($scope.current_user.token).then(function(response_game_accounts){
						response_games.data.forEach(function(game, index_game, array_game){
							var game_ok = false;
							response_game_accounts.data.some(function(game_acc, index_game_acc, array_game_acc){
								if(game_acc.GameId==game.id){
									var item = {
										GameId: game.id,
										name: game.name,
										username: game_acc.username,
										game_id: game_acc.game_id,
										connected: true
									};
									Mojang.skstatFreebuild().then(function(stats){
										if(stats.status==200){
											console.log(stats);
											stats.data.some(function(element, index, array){
												console.log(element);
												if(item.username==element.Player){
													console.log(element.Player);
													item.stats = stats.data;
													return true;
												}
											});
											game_ok = true;
											return true;
										}
									}, function(err_stats){
										$scope.games.push(item);
										game_ok = true;
										return true;
									});
								}
							});
							if(!game_ok){
								var item = {
									GameId: game.id,
									name: game.name,
									connected: false
								};
								$scope.games.push(item);
							}
						});
						console.log($scope.games);
					}, function(err_game_accounts){
						console.log(err_game_accounts);
						response_games.data.forEach(function(game, index_game, array_game){
							var item = {
								GameId: game.id,
								name: game.name,
								connected: false
							};
							$scope.games.push(item);
						});
						console.log($scope.games);
						handleUnlimitedTabsRender();
					});
				}
			}, function(err_games){
				console.log(err);
			});
			
		}
	}

	$scope.loginMinecraft = function(){
		$scope.errors_minecraft = [];
		Mojang.auth($scope.form_minecraft.mail, $scope.form_minecraft.password).then(function(response){
			if(response.status==200){
				console.log(response);
				Game_account.getGameAccounts($scope.current_user.token).then(function(game_account){
					console.log(game_account);
					if(game_account.data&&game_account.data.length==0){
						createMinecraftGameAccount(response.data);
					}
				}, function(err_game_account){
					console.log(err_game_account);
					createMinecraftGameAccount(response.data);
				});
			}
		}, function(err){
			console.log(err);
			$scope.errors_minecraft.push(err);
		});
	}

	$scope.logoutMinecraftAcount = function(id){
		Game_account.deleteGameAccount($scope.current_user.token, id).then(function(response_delete){
			if(response_delete.status==200){
				refresh();
			}
		}, function(err_delete){
			console.log(err_delete);
		});
	};

	function createMinecraftGameAccount(mojang_res) {
		var GameId = null;
		$scope.games.some(function(element, index, array){
			console.log(element);
			if(element.name=='Minecraft'){
				GameId = element.GameId;
				return true;
			}
		});
		if(GameId!=null){
			Game_account.createGameAccount($scope.current_user.token, GameId, mojang_res.selectedProfile.name, mojang_res.user.id).then(function(new_game_acc){
				if(new_game_acc.status==200){
					$('#modal-connect').modal('hide');
					initForm();
					refresh();
				}
			}, function(err_new_game_acc){
				$scope.errors_minecraft.push('Echec lors de la création du compte de jeu !');
			});
		}
	}

	refresh();

	/* 17. Handle Unlimited Nav Tabs - added in V1.6
	------------------------------------------------ */
	var handleUnlimitedTabsRender = function() {
	    
	    // function handle tab overflow scroll width 
	    function handleTabOverflowScrollWidth(obj, animationSpeed) {
	        var marginLeft = parseInt($(obj).css('margin-left'));  
	        var viewWidth = $(obj).width();
	        var prevWidth = $(obj).find('li.active').width();
	        var speed = (animationSpeed > -1) ? animationSpeed : 150;
	        var fullWidth = 0;

	        $(obj).find('li.active').prevAll().each(function() {
	            prevWidth += $(this).width();
	        });

	        $(obj).find('li').each(function() {
	            fullWidth += $(this).width();
	        });

	        if (prevWidth >= viewWidth) {
	            var finalScrollWidth = prevWidth - viewWidth;
	            if (fullWidth != prevWidth) {
	                finalScrollWidth += 40;
	            }
	            $(obj).find('.nav.nav-tabs').animate({ marginLeft: '-' + finalScrollWidth + 'px'}, speed);
	        }

	        if (prevWidth != fullWidth && fullWidth >= viewWidth) {
	            $(obj).addClass('overflow-right');
	        } else {
	            $(obj).removeClass('overflow-right');
	        }

	        if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
	            $(obj).addClass('overflow-left');
	        } else {
	            $(obj).removeClass('overflow-left');
	        }
	    }
	    
	    // function handle tab button action - next / prev
	    function handleTabButtonAction(element, direction) {
	        var obj = $(element).closest('.tab-overflow');
	        var marginLeft = parseInt($(obj).find('.nav.nav-tabs').css('margin-left'));  
	        var containerWidth = $(obj).width();
	        var totalWidth = 0;
	        var finalScrollWidth = 0;

	        $(obj).find('li').each(function() {
	            if (!$(this).hasClass('next-button') && !$(this).hasClass('prev-button')) {
	                totalWidth += $(this).width();
	            }
	        });
	    
	        switch (direction) {
	            case 'next':
	                var widthLeft = totalWidth + marginLeft - containerWidth;
	                if (widthLeft <= containerWidth) {
	                    finalScrollWidth = widthLeft - marginLeft;
	                    setTimeout(function() {
	                        $(obj).removeClass('overflow-right');
	                    }, 150);
	                } else {
	                    finalScrollWidth = containerWidth - marginLeft - 80;
	                }

	                if (finalScrollWidth != 0) {
	                    $(obj).find('.nav.nav-tabs').animate({ marginLeft: '-' + finalScrollWidth + 'px'}, 150, function() {
	                        $(obj).addClass('overflow-left');
	                    });
	                }
	                break;
	            case 'prev':
	                var widthLeft = -marginLeft;
	            
	                if (widthLeft <= containerWidth) {
	                    $(obj).removeClass('overflow-left');
	                    finalScrollWidth = 0;
	                } else {
	                    finalScrollWidth = widthLeft - containerWidth + 80;
	                }
	                $(obj).find('.nav.nav-tabs').animate({ marginLeft: '-' + finalScrollWidth + 'px'}, 150, function() {
	                    $(obj).addClass('overflow-right');
	                });
	                break;
	        }
	    }

	    // handle page load active tab focus
	    function handlePageLoadTabFocus() {
	        $('.tab-overflow').each(function() {
	            var targetWidth = $(this).width();
	            var targetInnerWidth = 0;
	            var targetTab = $(this);
	            var scrollWidth = targetWidth;

	            $(targetTab).find('li').each(function() {
	                var targetLi = $(this);
	                targetInnerWidth += $(targetLi).width();
	    
	                if ($(targetLi).hasClass('active') && targetInnerWidth > targetWidth) {
	                    scrollWidth -= targetInnerWidth;
	                }
	            });

	            handleTabOverflowScrollWidth(this, 0);
	        });
	    }
	    
	    // handle tab next button click action
	    $('[data-click="next-tab"]').click(function(e) {
	        e.preventDefault();
	        handleTabButtonAction(this,'next');
	    });
	    
	    // handle tab prev button click action
	    $('[data-click="prev-tab"]').click(function(e) {
	        e.preventDefault();
	        handleTabButtonAction(this,'prev');

	    });
	    
	    // handle unlimited tabs responsive setting
	    $(window).resize(function() {
	        $('.tab-overflow .nav.nav-tabs').removeAttr('style');
	        handlePageLoadTabFocus();
	    });
	    
	    handlePageLoadTabFocus();
	};

	handleUnlimitedTabsRender();

});