/*
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    /* jshint esversion: 8 */

    // Web Components
    class HTMLElement {
    }

    // Vue + Vuex
    class Vue {
    }

    class Vuex {
    }

    Vuex.Store = class {
    } ;

 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    /* jshint esversion: 8 */


    /**
     * WepSIM nodejs aux.
     */

    function wepsim_nodejs_retfill ( ok, msg )
    {
        var msg_txt = msg.replace(/<br>/g,        '\n')
                         .replace(/<EOF>/g,       '[eof]')
                         .replace(/<[^>]*>/g,     '') ;

        var ret = {
                     ok:   ok,
                     html: msg,
                     msg:  treatHTMLSequences(msg_txt)
                  } ;

        return ret ;
    }

    var hash_detail_ui = {

	    "SCREEN":         {
		                                  init: simcore_do_nothing_handler,
		                    get_screen_content: function() {
					                   return simcore_native_get_value("SCREEN", "content") ;
				                        },
                                    set_screen_content: function ( screen_content ) {
                                                           simcore_native_set_value("SCREEN", "content", screen_content) ;
							   return screen_content ;
					                }
	                      },

	    "KEYBOARD":       {
		                                  init: simcore_do_nothing_handler,
		                  get_keyboard_content: function () {
							   var readlineSync = require('readline-sync');
							   var keys = readlineSync.question('keyboard> ');
							   keystrokes = keys.toString() ;

                                                           simcore_native_set_value("KBD", "keystrokes", keystrokes) ;
							   return keystrokes ;
						        },
                                  set_keyboard_content: function( keystrokes ) {
                                                           simcore_native_set_value("KBD", "keystrokes", keystrokes) ;
					                   return keystrokes ;
				                        }
	                      }
	} ;

    function wepsim_nodejs_load_jsonfile ( url_json )
    {
       var fs   = null ;
       var jstr = "" ;
       var jobj = [] ;

       try {
             fs = require('fs') ;
           jstr = fs.readFileSync(url_json, 'utf8') ;
           jobj = JSON.parse(jstr) ;
       }
       catch (e) {
           console.log("Unable to load '" + url_json + "': " + e + ".\n") ;
           jobj = [] ;
       }

       return jobj ;
    }


    /*
     * Examples
     */

    function wepsim_nodejs_load_examples ( )
    {
       var jindex = [] ;
       var jobj   = [] ;

       // try to load the index
       var url_example_list = get_cfg('example_url') ;
       jindex = wepsim_nodejs_load_jsonfile(url_example_list) ;

       // try to load each one
       for (var i=0; i<jindex.length; i++)
       {
            jobj = wepsim_nodejs_load_jsonfile(jindex[i].url) ;
            ws_info.examples = ws_info.examples.concat(jobj) ;
       }

       return ws_info.examples ;
    }

    // wepsim_nodejs_examples2tests function will output the 'devel/test_wepsim_packX.json' content for examples
    function wepsim_nodejs_examples2tests ( example_pack_name, examples )
    {
       var d = '' ;
       var m = '' ;
       var a = '' ;
       var h = '' ;
       var e = '' ;

       var o = '[\n' ;
       for (var x=0; x<examples.length; x++)
       {
            if (false == examples[x].testing) {
                continue ;
            }

        //  d = examples[x].id + ' - ' + examples[x].type  + ' - ' + examples[x].title ;
            d = examples[x].id + ' - ' + examples[x].title ;
            m = './examples/microcode/mc-' + examples[x].microcode + '.txt' ;
            a = './examples/assembly/asm-' + examples[x].assembly  + '.txt' ;
            h = examples[x].hardware ;
            e = (m != (examples.length-1)) ? ',\n' : '\n' ;

            o += '{\n' +
                 '\t"pack":        "' + example_pack_name + '",\n' +
                 '\t"description": "' + d + '",\n' +
                 '\t"test":        "./ws_dist/wepsim.sh -a run -m ' + h + ' -f ' + m + ' -s ' + a + '",\n' +
                 '\t"more":        "See WepSIM"\n' +
                 '}' + e ;
       }
       o += ']\n' ;

       return o ;
    }


    /*
     * States
     */

    function wepsim_nodejs_show_currentstate ( options )
    {
        var state_obj = simcore_simstate_current2state() ;
        var   ret_msg = simcore_simstate_state2checklist(state_obj, options.purify) ;

	return wepsim_nodejs_retfill(true, ret_msg) ;
    }

    function wepsim_nodejs_show_checkresults ( checklist_ok, newones_too )
    {
	var data3_bin   = simcore_simstate_checklist2state(checklist_ok) ;
	var obj_current = simcore_simstate_current2state();
	var obj_result  = simcore_simstate_check_results(data3_bin, obj_current, newones_too ) ;

	var ret_ok  = (0 == obj_result.errors) ;
        var ret_msg = simcore_simstate_checkreport2txt(obj_result.result) ;
	return wepsim_nodejs_retfill(ret_ok, ret_msg) ;
    }


    /*
     * Records
     */

    function wepsim_nodejs_show_record ( records )
    {
	var ret_msg = '' ;
	for (var i=0; i<records.length; i++)
	{
	     ret_msg += '[' + i + '] ' + records[i].description + '\n' ;
	}

	return ret_msg ;
    }


    /*
     * breakpoints
     */

    var breaks  = {} ;
    var mbreaks = {} ;

    function wepsim_nodejs_breakpoints_addrm ( break_list, addr )
    {
	var hexaddr = "0x" + addr.toString(16) ;
	var ret = false ;

        if (break_list == "breaks") {
	    ret = wepsim_execute_toggle_breakpoint(hexaddr) ;
	    console.log('break on ' + hexaddr + ' ' + !ret) ;
            breaks[hexaddr] = true ;
	    if (ret) delete breaks[hexaddr] ;
        }
   else if (break_list == "mbreaks") {
            ret = wepsim_execute_toggle_microbreakpoint(hexaddr) ;
            console.log('mbreak on ' + hexaddr + ' ' + !ret) ;
            mbreaks[hexaddr] = true ;
	    if (ret) delete mbreaks[hexaddr] ;
        }
    }

    function wepsim_nodejs_breakpoints_list ( break_list )
    {
        var eltos = Object.keys(break_list) ;
        if (0 == eltos.length) {
            console.log('no active breakpoints.') ;
            return ;
        }

        console.log('active breaks at: ' + eltos.join(', ')) ;
    }


    /*
     * Execution
     */

    // show source listing
    function wepsim_nodejs_header1 ( )
    {
        console.log('pc'          + ','.padEnd(3, '\t') +
                    'instruction' + ','.padEnd(4, '\t')) ;
    }

    function wepsim_nodejs_after_instruction1 ( SIMWARE, reg_pc )
    {
        var curr_mp = simhw_internalState('MP') ;
        if (typeof curr_mp[reg_pc] === 'undefined') {
	    return ;
	}

        var curr_pc = '0x' + reg_pc.toString(16) ;
        var source_line = main_memory_getsrc(curr_mp, reg_pc) ;
	    source_line = source_line.replace(/,/g,"") ;
	var padding2 = 5 - (source_line.length / 7) ;

        console.log('pc = ' + curr_pc + ','.padEnd(2, '\t') +
		          source_line + ','.padEnd(padding2, '\t')) ;
    }


    // show execution progress
    var before_state = null ;
    var  after_state = null ;

    function wepsim_nodejs_header2 ( )
    {
        console.log('pc'          + ','.padEnd(3, '\t') +
                    'instruction' + ','.padEnd(4, '\t') +
                    'changes_from_zero_or_current_value') ;
    }

    function wepsim_nodejs_before_instruction2 ( SIMWARE, reg_pc )
    {
        if (before_state === null)
             before_state = simcore_simstate_current2state() ;
	else before_state = after_state ;
    }

    function wepsim_nodejs_after_instruction2  ( SIMWARE, reg_pc )
    {
        var curr_mp = simhw_internalState('MP') ;
        if (typeof curr_mp[reg_pc] === 'undefined') {
	    return ;
	}

        var curr_pc = '0x' + reg_pc.toString(16) ;
        var source_line = main_memory_getsrc(curr_mp, reg_pc) ;
	    source_line = source_line.replace(/,/g,"") ;

            after_state = simcore_simstate_current2state() ;
        var diff_states = simcore_simstate_diff_states(before_state, after_state) ;

	// padding
	var padding1 = 2 ;
	var padding2 = 5 - (source_line.length / 7) ;

        console.log('pc = ' + curr_pc + ','.padEnd(padding1, '\t') +
		    source_line       + ','.padEnd(padding2, '\t') +
		    diff_states) ;
    }

    function wepsim_nodejs_header3 ( )
    {
        console.log('micropc'     + ','.padEnd(3, '\t') +
                    'microcode'   + ','.padEnd(5, '\t') +
                    'changes_from_zero_or_current_value') ;
    }

    function wepsim_nodejs_before_microinstruction3 ( curr_MC, cur_addr )
    {
        if (before_state === null)
             before_state = simcore_simstate_current2state() ;
	else before_state = after_state ;
    }

    function wepsim_nodejs_after_microinstruction3  ( curr_MC, cur_addr )
    {
	    after_state = simcore_simstate_current2state() ;
	var curr_mpc    = '0x' + cur_addr.toString(16) ;
        var source_line = control_memory_lineToString(curr_MC, cur_addr).trim() ;
	    source_line = source_line.replace(/,/g,"") ;
            source_line = treatHTMLSequences(source_line) ;

	// padding
	var padding1 = 4 - (curr_mpc.length    / 4) ;
	var padding2 = 7 - (source_line.length / 8) ;

	console.log('micropc = ' + curr_mpc + ','.padEnd(padding1, '\t') +
		    source_line             + ','.padEnd(padding2, '\t') +
		    simcore_simstate_diff_states(before_state, after_state)) ;
    }

    function wepsim_nodejs_before_microinstruction4 ( curr_MC, cur_addr )
    {
	var curr_mpc = '0x' + cur_addr.toString(16) ;

	console.log('Micropc at ' + curr_mpc + '.\t' + get_verbal_from_current_mpc()) ;
    }


    /*
     * Interactive
     */

    function wepsim_nodejs_runInteractiveCmd ( answers, data, options )
    {
        var SIMWARE = get_simware() ;
        var pc_name = simhw_sim_ctrlStates_get().pc.state ;
        var reg_pc  = 0 ;

        var addr    = 0 ;
        var hexaddr = 0 ;
        var on_exit = false ;

        var parts   = answers.cmd.split(' ') ;
	switch(parts[0])
	{
	       case 'help':
		    console.log('help answer begins.') ;

		    // show help
		    console.log('' +
				'Available commands:\n' +
				' * help:   this command.\n' +
				' * exit:   exit from command line.\n' +
				'\n' +
				' * reset:  reset processor.\n' +
				' * run:    run all the instructions.\n' +
				' * next:   execute instruction at assembly level.\n' +
				' * step:   execute instruction at microinstruction level.\n' +
				'\n' +
				' * dump:   show the current state.\n' +
				' * list  <lines>: show <lines> lines of source code.\n' +
				'\n' +
				' * break  <addr>: breakpoint at given hexadecimal address.\n' +
				' * mbreak <addr>: breakpoint at given hex. address at microinst. level.\n' +
				'') ;

		    console.log('help answer ends.') ;
		    break ;

	       case 'quit':
	       case 'exit':
		    console.log('exit answer begins.') ;

		    // exit without asking 'are your sure?'
		    console.log('bYe!') ;

		    console.log('exit answer ends.') ;
                    on_exit = true ;
		    break ;

	       case 'cont':
	       case 'run':
		    console.log('run answer begins.') ;

		    // execute program
		    wepsim_nodejs_verbose_none(options) ;

                    var options2 = Object.assign({}, options) ;
                        options2.verbosity = 0 ;
		    var ret = wepsim_execute_chunk(options2, options2.instruction_limit) ;
		    if (ret.ok == false)
                    {
	                wepsim_nodejs_header2() ;
		        reg_pc = parseInt(get_value(simhw_sim_state(pc_name))) ;
		        wepsim_nodejs_after_instruction2(SIMWARE, reg_pc) ;

		        console.log(ret.msg + '\n' +
		                    "INFO: Execution stopped.") ;
		    }

		    console.log('run answer ends.') ;
		    break ;

	       case 'next':
		    console.log('next answer begins.') ;

		    // execute instruction
		    wepsim_nodejs_verbose_instructionlevel(options) ;
		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_before_instruction2(SIMWARE, reg_pc) ;

		    ret = simcore_execute_microprogram(options) ;
		    if (false === ret.ok) {
			console.log("ERROR: Execution: " + ret.msg + ".\n") ;
		    }

		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_after_instruction2(SIMWARE, reg_pc) ;

		    console.log('next answer ends.') ;
		    break ;

	       case 'step':
		    console.log('step answer begins.') ;

		    // execute microinstruction
		    wepsim_nodejs_verbose_microinstructionlevel(options) ;
		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_before_instruction2(SIMWARE, reg_pc) ;

		    ret = simcore_execute_microprogram(options) ;
		    if (false === ret.ok) {
			console.log("ERROR: Execution: " + ret.msg + ".\n") ;
		    }

	            wepsim_nodejs_header2() ;
		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_after_instruction2(SIMWARE, reg_pc) ;

		    console.log('step answer ends.') ;
		    break ;

	       case 'reset':
		    console.log('reset answer begins.') ;

		    // reset



