define( [ "qlik"],
function ( qlik) {

	function Action(app,layout){
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

	return {
		definition:{
			type: "items",
			component: "accordion",
			items: {
				settings: {
					uses: "settings",
					items: {
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
					}
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
			Action(app,layout);
			
			
			//$element.html( "Triggers" );
			//needed for export
			//return qlik.Promise.resolve();
		}
	};

} );

