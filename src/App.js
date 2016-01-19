import React, { Component } from 'react'

 var i = 0;
 
export default class App extends Component {

 clickMe(){

	 if(document.getElementById('txtInput').value !== '')
	{
	    i++;
		
		var title = document.getElementById('txtInput').value;
		var node = document.createElement('div');
		node.setAttribute("id", "div" + i);
		node.innerHTML = '<input type="checkbox" id="chk' + i +'" name="chk' + i + '"><label for="lbl' + i + '" id="lbl' + i +'">' + title + '</label><input type="image" id="del' + i +'" name="del' + i + '" src="https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/Folder%20and%20Places/Trash-Recyclebin-Empty-Closed.png" name="image" width="18" height="18" />';
		
		document.getElementById('container').appendChild(node);
		document.getElementById('txtInput').value = "";

		//For line through on checked
		var strike = document.getElementById('chk' + i);
		strike.addEventListener('change', function(e){
		e.preventDefault();
		var rows = this.id.replace(/[^0-9]/g, '');

		if(document.getElementById(this.id).checked){
		document.getElementById('lbl' + rows).style.textDecoration='line-through';
		}
		else{
		document.getElementById('lbl' + rows).style.textDecoration='none';
		}
		document.getElementById('txtInput').focus();
		});

		//For delete function
		var trash = document.getElementById('del' + i);
		trash.addEventListener('click', function(e){
		e.preventDefault();
		var rows = this.id.replace(/[^0-9]/g, '');
		var element = document.getElementById("div" + rows);
		element.parentNode.removeChild(element);
		document.getElementById('txtInput').focus();
		});
	}
	else
	{
		alert('Input is empty');
	}
	document.getElementById('txtInput').focus();
}

render() {
    return (
	<div id='container'>
      	<h1>YATL</h1>
	<input type='text' id='txtInput' placeholder='I need to...' ></input>
	<button id='btnAdd' onClick={this.clickMe} >+</button>
	<br/>
	<br/>
      	</div>
    )
  }
}
