define( [ "qlik"],
function ( qlik) {
	function Action_field(app,Objlayout){
		//console.log(Objlayout);
		$.each(Objlayout.trigger,function(k,layout){
			//console.log(layout.condition);
			if(layout.condition == 'true' || layout.condition){
				switch (layout.Action) {
					case 'selectMatch':
						if(layout.ToggleSelection){
							app.field('['+layout.FieldName+']').toggleSelect(layout.FieldValue,layout.SoftLock);
							console.log('toggleSelect');
						}else{
							app.field('['+layout.FieldName+']').selectMatch(layout.FieldValue, layout.SoftLock);
							console.log('selectMatch');
						}
						break;
					case 'selectPossible':
						console.log('selectPossible');
						app.field('['+layout.FieldName+']').selectPossible(layout.SoftLock);
						break;
					case 'selectExcluded':
						console.log('selectExcluded');
						app.field('['+layout.FieldName+']').selectExcluded(layout.SoftLock);
						break;
					case 'selectAlternative':
						console.log('selectAlternative');
						app.field('['+layout.FieldName+']').selectAlternative(layout.SoftLock);
						break;
					case 'selectAll':
						console.log('selectAll');
						app.field('['+layout.FieldName+']').selectAll(layout.SoftLock);
						break;
					case 'clear':
						console.log('clear');
						app.field('['+layout.FieldName+']').clear();
						break;
					case 'lock':
					console.log('lock');
					app.field('['+layout.FieldName+']').lock();
					break;
					case 'unlock':
					console.log('unlock');
					app.field('['+layout.FieldName+']').unlock();
					break;

				}
			}
		});
	}
	
	function Action_variable(app,Objlayout){
		$.each(Objlayout.trigger_var,function(k,layout){
			console.log(layout.condition,layout.variabletype);
			if(layout.condition == 'true' || layout.condition){
				switch (layout.variabletype) {
					case '1':
						console.log('Expr');
						app.variable.setContent(layout.variablename,layout.variablevalue);
					break;
					case '2':
						console.log('String');
						app.variable.setStringValue(layout.variablename,layout.variablevalue+'');
					break;
					case '3':
						console.log('Number');
						app.variable.setNumValue(layout.variablename,parseInt(layout.variablevalue));
					break;
				}
				
			}
		});
	}

	return {
		initialProperties: {
            trigger: [],
			trigger_var: []
        },
		definition:{
			type: "items",
			component: "accordion",
			items: {
				Trigger_var: {
					type: "array",
                            ref: "trigger_var",
                            label: "Define Variable Trigger",
                            itemTitleRef: "variablename",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Item",
                            items: {
								variabletype: {
									type: "string",
									component: "buttongroup",
									label: "Variable Type",
									ref: "variabletype",
									options: [{
										value: "1",
										label: "Expr",
										tooltip: "Select for entering Expression"
									}, {
										value: "2",
										label: "String",
										tooltip: "Select for String Value"
									}, {
										value: "3",
										label: "Number",
										tooltip: "Select for Number Value"
									}],
									defaultValue: "2"
								},
								variablename: {
									type: "string",
									ref: "variablename",
									label: "Variable Name"
								},
								variablevalue: {
									type: "string",
									ref: "variablevalue",
									label: "Value",
									expression: "optional"
								},
								condition: {
									type: "string",
									ref: "condition",
									label: "Condition",
									expression: "optional"
								}
                            }
				},
				Triggers: {
							type: "array",
                            ref: "trigger",
                            label: "Define Field Trigger",
                            itemTitleRef: "FieldName",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Field Actions",
							max: 10,
                            items: {
                              // start
								condition: {
									type: "string",
									ref: "condition",
									label: "Condition",
									expression: "optional"
								},
							  	FieldName: {
									ref: "FieldName",
									label: "Field Name",
									type: "string"
								},
								Action: {
									type: "string",
									component: "dropdown",
									label: "Action",
									ref: "Action",
									options: [{
											value: "selectMatch",
											label: "Select Match"
										}, {
											value: "selectPossible",
											label: "Select Possible"
										}, {
											value: "selectExcluded",
											label: "Select Excluded"
										}, {
											value: "selectAlternative",
											label: "Select Alternative "
										}, {
											value: "selectAll",
											label: "Select All"
										}, {
											value: "clear",
											label: "Clear Selection"
										}, {
											value: "lock",
											label: "Lock Selection"
										}, {
											value: "unlock",
											label: "Unlock Selection"
										}
									]
								},
								// if selectAll / selectAlternative / selectPossible / selectExcluded / clear then hide
								FieldValue: {
									ref: "FieldValue",
									label: "Field Value",
									type: "string",
									show: function(reply){
										//console.log(reply);
										if(reply.Action == 'selectMatch'){
											return true;
										}
									}
								},
								// if selectMatch then show
								SoftLock: {
									type: "boolean",
									label: "Soft Lock",
									ref: "SoftLock",
									defaultValue: false,
									show: function(reply){
										//console.log(reply);
										if(reply.Action == 'lock' || reply.Action == 'unlock' || reply.Action =='clear'){
											return false;
										}else{	
											return true;
										}
									}
								},
								// if selectMatch then show
								ToggleSelection: {
									type: "boolean",
									label: "Toggle Selection",
									ref: "ToggleSelection",
									defaultValue: false,
									show: function(reply){
										//console.log(reply);
										if(reply.Action == 'selectMatch'){
											return true;
										}
									}
								}
							  //end
                            }
						
				},
				settings: {
					uses: "settings"
					/*items: {
						
					}*/
				}
			}
		},
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element,layout) {
			//add your rendering code here
			//console.log(layout);
			var app = qlik.currApp();
			Action_field(app,layout);
			Action_variable(app,layout);
			//$element.html( "Triggers" );
			//needed for export
			//return qlik.Promise.resolve();
		}
	};

} );

