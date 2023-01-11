var WSCFG = {};

function get_cfg(field) {
    return WSCFG[field].value
}

function set_cfg(field, value) {
    WSCFG[field].value = value
}

function update_cfg(field, value) {
    WSCFG[field].value = value;
    simcore_record_append_new("Set configuration option " + field + " to " + value, 'update_cfg("' + field + '","' + value + '");\n');
    simcore_ga("config", "config." + WSCFG.version.value, "config." + WSCFG.version.value + "." + field + "." + value);
    save_cfg()
}

function is_cfg_empty() {
    return Object.keys(WSCFG).length === 0
}

function save_cfg() {
    try {
        for (var item in WSCFG) {
            localStorage.setItem("wepsim_" + item, get_cfg(item))
        }
    } catch (err) {
        console.log("WepSIM can not save the configuration in a persistent way on this web browser,\n" + "found following error: \n" + err.message)
    }
    set_secondary_cfg()
}

function restore_cfg() {
    WSCFG = get_primary_cfg();
    set_secondary_cfg();
    if (localStorage === null) {
        return
    }
    var default_value = null;
    var saved_value = null;
    for (var item in WSCFG) {
        if (item === "version") {
            continue
        }
        default_value = get_cfg(item);
        set_cfg(item, localStorage.getItem("wepsim_" + item));
        if (WSCFG[item].type != "string") {
            try {
                saved_value = JSON.parse(get_cfg(item));
                set_cfg(item, saved_value)
            } catch (e) {
                saved_value = null
            }
        }
        if (saved_value === null) {
            set_cfg(item, default_value)
        }
    }
    set_secondary_cfg()
}

function reset_cfg() {
    WSCFG = get_primary_cfg();
    set_secondary_cfg();
    save_cfg()
}

function reset_cfg_values() {
    WSCFG = get_primary_cfg();
    set_secondary_cfg()
}

function upgrade_cfg() {
    var wscfg = get_primary_cfg();
    var item = null;
    for (item in wscfg) {
        if (typeof WSCFG[item] === "undefined") {
            WSCFG[item] = wscfg[item]
        }
        if (WSCFG[item].value === null || WSCFG[item].value === "null") {
            WSCFG[item].value = wscfg[item].value
        }
    }
    if (wscfg.build.value != WSCFG.build.value) {
        for (item in wscfg) {
            if (wscfg[item].upgrade) {
                WSCFG[item] = wscfg[item]
            }
        }
    }
    set_secondary_cfg();
    save_cfg()
}

function is_mobile() {
    if (typeof navigator === "undefined") {
        return false
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function is_cordova() {
    return document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1
}

function get_primary_cfg() {
    var wscfg = {
        version: {
            upgrade: false,
            type: "string",
            value: "2.2.0"
        },
        build: {
            upgrade: true,
            type: "string",
            value: "2.2.0.20220905A"
        },
        color_data_active: {
            upgrade: false,
            type: "string",
            value: "#0066FF"
        },
        color_data_inactive: {
            upgrade: false,
            type: "string",
            value: "#000000"
        },
        color_name_active: {
            upgrade: false,
            type: "strifng",
            value: "#FF0000"
        },
        color_name_inactive: {
            upgrade: false,
            type: "string",
            value: "#000000"
        },
        size_active: {
            upgrade: false,
            type: "float",
            value: 1.25
        },
        size_inactive: {
            upgrade: false,
            type: "float",
            value: .02
        },
        is_byvalue: {
            upgrade: false,
            type: "boolean",
            value: false
        },
        CPUCU_show_graph: {
            upgrade: true,
            type: "boolean",
            value: true
        },
        RF_display_format: {
            upgrade: false,
            type: "string",
            value: "unsigned_16_fill"
        },
        RF_display_name: {
            upgrade: false,
            type: "string",
            value: "numerical"
        },
        MEM_display_format: {
            upgrade: true,
            type: "string",
            value: "unsigned_16_nofill"
        },
        MEM_show_segments: {
            upgrade: true,
            type: "boolean",
            value: false
        },
        MEM_show_source: {
            upgrade: true,
            type: "boolean",
            value: false
        },
        MEM_display_direction: {
            upgrade: true,
            type: "string",
            value: "h2l"
        },
        is_editable: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        DBG_delay: {
            upgrade: false,
            type: "int",
            value: 5
        },
        DBG_level: {
            upgrade: false,
            type: "string",
            value: "microinstruction"
        },
        DBG_limitins: {
            upgrade: false,
            type: "int",
            value: 1e4
        },
        DBG_limitick: {
            upgrade: false,
            type: "int",
            value: 1e3
        },
        DBG_skip_notifycolon: {
            upgrade: true,
            type: "boolean",
            value: false
        },
        ICON_theme: {
            upgrade: false,
            type: "string",
            value: "classic"
        },
        AS_enable: {
            upgrade: true,
            type: "boolean",
            value: true
        },
        AS_delay: {
            upgrade: true,
            type: "int",
            value: 500
        },
        NOTIF_delay: {
            upgrade: false,
            type: "int",
            value: 1e3
        },
        CPUCU_size: {
            upgrade: true,
            type: "int",
            value: 7
        },
        C1C2_size: {
            upgrade: true,
            type: "int",
            value: 8
        },
        SHOWCODE_label: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        SHOWCODE_addr: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        SHOWCODE_hex: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        SHOWCODE_ins: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        SHOWCODE_pins: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        ws_mode: {
            upgrade: false,
            type: "string",
            value: "newbie"
        },
        ws_action: {
            upgrade: false,
            type: "string",
            value: "checkpoint"
        },
        is_interactive: {
            upgrade: false,
            type: "boolean",
            value: true
        },
        is_quick_interactive: {
            upgrade: false,
            type: "boolean",
            value: false
        },
        ws_idiom: {
            upgrade: false,
            type: "string",
            value: "en"
        },
        use_voice: {
            upgrade: false,
            type: "boolean",
            value: false
        },
        ws_skin_ui: {
            upgrade: false,
            type: "string",
            value: "classic"
        },
        ws_skin_user: {
            upgrade: false,
            type: "string",
            value: "only_asm:of:only_frequent:on"
        },
        ws_skin_dark_mode: {
            upgrade: false,
            type: "boolean",
            value: false
        },
        editor_theme: {
            upgrade: false,
            type: "string",
            value: "default"
        },
        editor_mode: {
            upgrade: false,
            type: "string",
            value: "default"
        },
        base_url: {
            upgrade: true,
            type: "string",
            value: "https://wepsim.github.io/wepsim/ws_dist/"
        },
        cfg_url: {
            upgrade: true,
            type: "string",
            value: "examples/configuration/default.json"
        },
        example_url: {
            upgrade: true,
            type: "string",
            value: "examples/examples_set/default.json"
        },
        hw_url: {
            upgrade: true,
            type: "string",
            value: "examples/hardware/hw.json"
        },
        max_json_size: {
            upgrade: true,
            type: "int",
            value: 1 * 1024 * 1024
        },
        verbal_verbose: {
            upgrade: false,
            type: "string",
            value: "math"
        },
        use_ga: {
            upgrade: false,
            type: "boolean",
            value: true
        }
    };
    if (is_mobile()) {
        wscfg.NOTIF_delay.value = 2e3;
        wscfg.ICON_theme.value = "cat1";
        wscfg.CPUCU_size.value = 7;
        wscfg.C1C2_size.value = 14;
        wscfg.ws_skin_ui.value = "compact"
    }
    return wscfg
}

function set_secondary_cfg() {
    var dbg_delay = get_cfg("DBG_delay");
    if (dbg_delay < 5) {
        cfg_show_rf_delay = 350;
        cfg_show_eltos_delay = 350;
        cfg_show_main_memory_delay = 450;
        cfg_show_control_memory_delay = 360;
        cfg_show_dbg_ir_delay = 300;
        cfg_show_rf_refresh_delay = 120
    } else {
        cfg_show_rf_delay = 100;
        cfg_show_eltos_delay = 100;
        cfg_show_main_memory_delay = 150;
        cfg_show_control_memory_delay = 120;
        cfg_show_dbg_ir_delay = 100;
        cfg_show_rf_refresh_delay = 30
    }
    cfg_show_asmdbg_pc_delay = 50;
    if (dbg_delay < 3) cfg_show_asmdbg_pc_delay = 150
}
var ws_cfg_hash = {};
var ws_cfg_set = [];

function cfgset_init() {
    var url_list = get_cfg("cfg_url");
    ws_cfg_set = wepsim_url_getJSON(url_list);
    for (var i = 0; i < ws_cfg_set.length; i++) {
        ws_cfg_hash[ws_cfg_set[i].name] = ws_cfg_set[i].url
    }
    return ws_cfg_hash
}

function cfgset_getSet() {
    return ws_cfg_hash
}

function cfgset_load(cfg_name) {
    var ret = null;
    var jobj = null;
    if (typeof ws_cfg_hash[cfg_name] === "undefined") {
        return ret
    }
    try {
        jobj = $.getJSON({
            url: ws_cfg_hash[cfg_name],
            async: false
        });
        jobj = JSON.parse(jobj.responseText);
        ret = cfgset_import(jobj)
    } catch (e) {
        ws_alert("WepSIM can not import the configuration from URL: \n'" + ws_cfg_hash[cfg_name] + "'.\n" + "Found following error: \n" + err.message)
    }
    return ret
}

function cfgset_import(wscfg) {
    for (var item in wscfg) {
        if (typeof WSCFG[item] === "undefined") {
            continue
        }
        if (WSCFG[item].type !== wscfg[item].type) {
            continue
        }
        WSCFG[item] = wscfg[item]
    }
    set_secondary_cfg();
    return true
}

function simcore_ga(category, action, label) {
    if (typeof ga === "undefined") {
        return
    }
    if (get_cfg("use_ga") == false) {
        return
    }
    ga("send", "event", category, action, label)
}

function get_simware() {
    return simhw_internalState("FIRMWARE")
}

function set_simware(preWARE) {
    var cf = simhw_internalState("FIRMWARE");
    for (var item in preWARE) {
        if (typeof preWARE[item] !== "undefined") {
            cf[item] = preWARE[item]
        }
    }
}
ws_empty_firmware = {
    firmware: [],
    mp: {},
    seg: {},
    labels: {},
    labels2: {},
    labels_firm: {},
    registers: {},
    pseudoInstructions: [],
    stackRegister: null,
    cihash: {},
    cocop_hash: {},
    revlabels: {},
    revlabels2: {},
    revseg: []
};
var ws_info = {};

function get_wsinfo(key) {
    return ws_info[key]
}

function set_wsinfo(key, value) {
    return ws_info[key] = value
}
var wsauthors = [{
    c_id: "collapse-author-1",
    i_src: "images/author_fgarcia.png",
    i_alt: "Félix García Carballeira",
    a_id: "fgarcia",
    a_name: "F&eacute;lix Garc&iacute;a Carballeira",
    socials: {
        lkin: {
            name: "linkedin",
            faclass: "fab fa-linkedin",
            href: ""
        },
        rgate: {
            name: "r-gate",
            faclass: "fab fa-researchgate",
            href: "https://www.researchgate.net/profile/Felix_Garcia-Carballeira"
        },
        github: {
            name: "github",
            faclass: "fab fa-github",
            href: ""
        }
    }
}, {
    c_id: "collapse-author-2",
    i_src: "images/author_acaldero.png",
    i_alt: "Alejandro Calderón Mateos",
    a_id: "acaldero",
    a_name: "Alejandro Calder&oacute;n Mateos",
    socials: {
        lkin: {
            name: "linkedin",
            faclass: "fab fa-linkedin",
            href: "https://www.linkedin.com/in/alejandro-calderon-mateos/"
        },
        rgate: {
            name: "r-gate",
            faclass: "fab fa-researchgate",
            href: "https://www.researchgate.net/profile/Alejandro_Calderon2"
        },
        github: {
            name: "github",
            faclass: "fab fa-github",
            href: "https://github.com/acaldero/"
        }
    }
}, {
    c_id: "collapse-author-3",
    i_src: "images/author_jprieto.png",
    i_alt: "Javier Prieto Cepeda",
    a_id: "jprieto",
    a_name: "Javier Prieto Cepeda",
    socials: {
        lkin: {
            name: "linkedin",
            faclass: "fab fa-linkedin",
            href: "https://www.linkedin.com/in/javier-prieto-cepeda"
        },
        rgate: {
            name: "r-gate",
            faclass: "fab fa-researchgate",
            href: ""
        },
        github: {
            name: "github",
            faclass: "fab fa-github",
            href: ""
        }
    }
}, {
    c_id: "collapse-author-4",
    i_src: "images/author_salonso.png",
    i_alt: "Saúl Alonso Monsalve",
    a_id: "salonso",
    a_name: "Sa&uacute;l Alonso Monsalve",
    socials: {
        lkin: {
            name: "linkedin",
            faclass: "fab fa-linkedin",
            href: "https://www.linkedin.com/in/salonsom/"
        },
        rgate: {
            name: "r-gate",
            faclass: "fab fa-researchgate",
            href: "https://www.researchgate.net/profile/Saul_Alonso_Monsalve"
        },
        github: {
            name: "github",
            faclass: "fab fa-github",
            href: "https://github.com/saulam/"
        }
    }
}];
set_wsinfo("authors", wsauthors);
var ws_records = [];
var ws_last_played = 0;
var ws_last_toplay = 0;
var ws_last_time = 0;
var ws_last_timer = null;
var ws_is_recording = false;
var ws_is_playing = false;
var ws_record_msg_name = "";
var ws_record_msg_obj = null;
var ws_record_pb_name = "";
var ws_record_pb_obj = null;

function simcore_record_pushElto(desc, elto, distance) {
    var record = {
        timestamp: distance,
        description: desc,
        element: elto
    };
    ws_records.push(record)
}

function simcore_record_showMsg(index, msg) {
    if (ws_record_msg_obj !== null) {
        ws_record_msg_obj.html("<em>" + index + "/" + ws_records.length + "</em>&nbsp;" + msg)
    }
    if (ws_record_pb_obj !== null) {
        var next_pbval = 100 * index / ws_records.length;
        ws_record_pb_obj.css("width", next_pbval + "%").attr("aria-valuenow", next_pbval)
    }
}

function simcore_record_playAt(index_current, index_last) {
    if (ws_is_playing === false) {
        simcore_record_showMsg(ws_last_played, "Stopped by user.");
        return
    }
    ws_last_played = index_current;
    if (index_current >= index_last) {
        simcore_record_showMsg(index_last, "Done.");
        return
    }
    if (ws_records[index_current].description === "_pending event_") {
        simcore_record_playAt(index_current + 1, index_last);
        return
    }
    eval(ws_records[index_current].element);
    var index_next = index_current + 1;
    simcore_record_showMsg(index_next, ws_records[index_current].description);
    var wait_time = 500;
    if (index_next < index_last) {
        wait_time = ws_records[index_next].timestamp
    }
    if (wait_time !== 0) {
        wait_time = wait_time < 500 ? 500 : wait_time
    }
    ws_last_timer = setTimeout((function() {
        simcore_record_playAt(index_next, index_last)
    }), wait_time)
}
var ws_glowing_time = 250;

function simcore_record_glowing(ui_id) {
    var ui_obj = $(ui_id);
    if (ui_obj === null) {
        return
    }
    ui_obj.addClass("btn-warning");
    setTimeout((function() {
        ui_obj.removeClass("btn-warning")
    }), ws_glowing_time)
}

function simcore_record_glowAdd() {
    var ui_obj = $(this);
    var ui_id = ui_obj.attr("id");
    if (typeof ui_id === "undefined") {
        return
    }
    if (ws_is_recording === false) {
        return
    }
    ui_obj.one("click", simcore_record_glowAdd);
    simcore_record_resolve_pending("Click on UI element " + ui_id, 'simcore_record_glowing("#' + ui_id + '");\n')
}

function simcore_record_init(div_msg_id, div_pb_id) {
    ws_records = [];
    ws_last_played = 0;
    ws_last_time = 0;
    ws_is_playing = false;
    ws_is_recording = false;
    ws_record_msg_name = div_msg_id;
    ws_record_msg_obj = $("#" + div_msg_id);
    if (typeof ws_record_msg_obj.html === "undefined") {
        ws_record_msg_obj = null
    }
    ws_record_pb_name = div_pb_id;
    ws_record_pb_obj = $("#" + div_pb_id);
    if (typeof ws_record_pb_obj.html === "undefined") {
        ws_record_pb_obj = null
    }
}

function simcore_record_captureInit() {
    $(".nav-link").off("click", simcore_record_glowAdd);
    $(".btn-like").off("click", simcore_record_glowAdd);
    $(".btn").off("click", simcore_record_glowAdd);
    $(".nav-link").one("click", simcore_record_glowAdd);
    $(".btn-like").one("click", simcore_record_glowAdd);
    $(".btn").one("click", simcore_record_glowAdd)
}

function simcore_record_start() {
    ws_is_playing = false;
    ws_is_recording = true;
    ws_last_played = 0;
    ws_last_time = Date.now();
    simcore_record_showMsg(ws_last_played, "Recording...")
}

function simcore_record_stop() {
    ws_is_playing = false;
    ws_is_recording = false;
    ws_last_played = 0;
    ws_last_toplay = ws_records.length;
    simcore_record_showMsg(ws_last_played, "Stopped by user.")
}

function simcore_record_isRecording() {
    return ws_is_recording
}

function simcore_record_play() {
    if (ws_is_playing === true) {
        clearTimeout(ws_last_timer);
        if (ws_last_played < ws_records.length) ws_last_played = ws_last_played + 1;
        else ws_last_played = 0
    } else {
        ws_last_toplay = ws_records.length
    }
    ws_is_playing = true;
    ws_is_recording = false;
    simcore_record_playAt(ws_last_played, ws_last_toplay)
}

function simcore_record_playInterval(from, to) {
    if (ws_is_playing === true) {
        clearTimeout(ws_last_timer);
        if (ws_last_played < to) ws_last_played = ws_last_played + 1;
        else ws_last_played = from
    } else {
        ws_last_played = from
    }
    ws_last_toplay = to;
    ws_is_playing = true;
    ws_is_recording = false;
    simcore_record_playAt(ws_last_played, ws_last_toplay)
}

function simcore_record_pause() {
    ws_is_playing = !ws_is_playing;
    ws_is_recording = false;
    if (ws_is_playing === true) {
        simcore_record_playAt(ws_last_played, ws_last_toplay)
    }
}

function simcore_record_isPlaying() {
    return ws_is_playing
}

function simcore_record_length() {
    return ws_records.length
}

function simcore_record_get() {
    return ws_records
}

function simcore_record_set(records) {
    ws_last_played = 0;
    ws_last_time = 0;
    ws_is_playing = false;
    ws_is_recording = false;
    ws_records = records;
    simcore_record_showMsg(0, "Record restored.")
}

function simcore_record_reset() {
    ws_last_played = 0;
    ws_last_toplay = 0;
    ws_last_time = 0;
    ws_is_playing = false;
    ws_is_recording = false;
    ws_records = [];
    simcore_record_showMsg(0, "Empty record")
}

function simcore_record_append_new(description, elto) {
    if (ws_is_recording === true) {
        var distance = Date.now() - ws_last_time;
        ws_last_time = Date.now();
        simcore_record_pushElto(description, elto, distance);
        simcore_record_showMsg(0, "Recording...")
    }
}

function simcore_record_append_pending() {
    if (ws_is_recording === true) {
        var distance = Date.now() - ws_last_time;
        ws_last_time = Date.now();
        if (0 == distance && ws_records.length > 0 && ws_records[ws_records.length - 1].description === "_pending event_") {
            distance = ws_glowing_time
        }
        simcore_record_pushElto("_pending event_", ";", distance)
    }
}

function simcore_record_resolve_pending(description, elto) {
    if (ws_is_recording === true) {
        var last_pending = ws_records.length;
        while (last_pending > 0) {
            last_pending--;
            if (ws_records[last_pending].description === "_pending event_") {
                break
            }
        }
        if (last_pending === 0) {
            simcore_record_setTimeBeforeNow(0);
            simcore_record_append_new(description, elto);
            return
        }
        ws_records[last_pending].description = description;
        ws_records[last_pending].element = elto;
        simcore_record_showMsg(0, "Recording...")
    }
}

function simcore_record_setTimeBeforeNow(distance) {
    ws_last_time = Date.now() - distance
}

function simcore_record_addTimeAfterLast(distance) {
    ws_last_time = ws_last_time + distance
}

function array_includes(arr, val) {
    if (typeof arr.includes != "undefined") {
        return arr.includes(val)
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return true
        }
    }
    return false
}

function update_cpu_bus_fire(tri_mask, tri_index) {
    var n = 0;
    var a = 0;
    var e = -1;
    for (var i = 0; i < 32; i++) {
        a = tri_mask & Math.pow(2, i);
        if (a > 0) {
            e = i;
            n = n + 1
        }
    }
    if (n > 0) {
        var tri_state_names = simhw_internalState("tri_state_names");
        var tri_name = tri_state_names[e];
        update_draw(simhw_sim_signal(tri_name), 1)
    }
    if (n > 1) {
        update_bus_visibility("internalbus_fire", "visible");
        simhw_internalState_set("fire_visible", "internalbus", true);
        simhw_sim_state("BUS_IB").value = 4294967295
    } else {
        update_bus_visibility("internalbus_fire", "hidden");
        simhw_internalState_set("fire_visible", "internalbus", false)
    }
    return n
}

function update_system_bus_fire(number_active_tri) {
    if (simhw_internalState_get("fire_visible", "databus") == true) {
        update_bus_visibility("databus_fire", "hidden");
        simhw_internalState_set("fire_visible", "databus", false)
    }
    if (number_active_tri > 1) {
        update_bus_visibility("databus_fire", "visible");
        simhw_internalState_set("fire_visible", "databus", true);
        simhw_sim_state("BUS_DB").value = 4294967295
    }
    return number_active_tri
}

function fn_updateE_now(key) {
    if ("E" == simhw_sim_signal(key).type) {
        update_state(key)
    }
}

function fn_updateE_future(key) {
    if (jit_fire_ndep[key] < 1) fn_updateE_now(key);
    else return new Promise((function(resolve, reject) {
        fn_updateE_now(key)
    }))
}

function fn_updateL_now(key) {
    update_draw(simhw_sim_signal(key), simhw_sim_signal(key).value);
    if ("L" == simhw_sim_signal(key).type) {
        update_state(key)
    }
}

function fn_updateL_future(key) {
    if (jit_fire_ndep[key] < 1) fn_updateL_now(key);
    else return new Promise((function(resolve, reject) {
        fn_updateL_now(key)
    }))
}

function update_state(key) {
    var index_behavior = 0;
    switch (simhw_sim_signal(key).behavior.length) {
        case 0:
            return;
            break;
        case 1:
            index_behavior = 0;
            break;
        default:
            index_behavior = simhw_sim_signal(key).value;
            if (simhw_sim_signal(key).behavior.length < index_behavior) {
                ws_alert("ALERT: there are more signals values than behaviors defined!!!!\n" + "key: " + key + " and signal value: " + index_behavior);
                return
            }
            break
    }
    compute_signal_behavior(key, index_behavior)
}

function update_signal_firmware(key) {
    var SIMWARE = get_simware();
    var maddr_name = simhw_sim_ctrlStates_get().mpc.state;
    var reg_maddr = get_value(simhw_sim_state(maddr_name));
    var assoc_i = -1;
    for (var i = 0; i < SIMWARE["firmware"].length; i++) {
        if (parseInt(SIMWARE["firmware"][i]["mc-start"]) > reg_maddr) {
            break
        }
        assoc_i = i
    }
    if (-1 == assoc_i) {
        ws_alert("A new 'unknown' instruction is inserted,\n" + "please edit it (co, nwords, etc.) in the firmware textarea.");
        var new_ins = new Object;
        new_ins["name"] = "unknown";
        new_ins["signature"] = "unknown";
        new_ins["signatureGlobal"] = "unknown";
        new_ins["co"] = 0;
        new_ins["nwords"] = 0;
        new_ins["mc-start"] = 0;
        new_ins["fields"] = new Array;
        new_ins["microcode"] = new Array;
        new_ins["microcomments"] = new Array;
        SIMWARE["firmware"].push(new_ins);
        assoc_i = SIMWARE["firmware"].length - 1
    }
    var pos = reg_maddr - parseInt(SIMWARE["firmware"][assoc_i]["mc-start"]);
    if (typeof SIMWARE["firmware"][assoc_i]["microcode"][pos] == "undefined") {
        SIMWARE["firmware"][assoc_i]["microcode"][pos] = new Object;
        SIMWARE["firmware"][assoc_i]["microcomments"][pos] = ""
    }
    SIMWARE["firmware"][assoc_i]["microcode"][pos][key] = simhw_sim_signal(key).value;
    if (simhw_sim_signal(key).default_value == simhw_sim_signal(key).value) {
        delete SIMWARE["firmware"][assoc_i]["microcode"][pos][key]
    }
    var bits = get_value(simhw_sim_state("REG_IR")).toString(2);
    bits = "00000000000000000000000000000000".substring(0, 32 - bits.length) + bits;
    show_memories_values()
}

function propage_signal_update(key) {
    if (true === get_cfg("is_interactive")) {
        if (simhw_sim_signal(key).value != simhw_sim_signal(key).default_value) simhw_sim_state("REG_MICROINS").value[key] = simhw_sim_signal(key).value;
        else delete simhw_sim_state("REG_MICROINS").value[key];
        var maddr_name = simhw_sim_ctrlStates_get().mpc.state;
        var curr_maddr = get_value(simhw_sim_state(maddr_name));
        var mc_obj = simhw_internalState("MC");
        var mcelto = control_memory_get(mc_obj, curr_maddr);
        if (typeof mcelto === "undefined") {
            mcelto = {
                value: {},
                comments: null
            }
        }
        mcelto.value[key] = simhw_sim_signal(key).value;
        mcelto.comments = [];
        control_memory_set(mc_obj, curr_maddr, mcelto);
        update_signal_firmware(key);
        var SIMWARE = get_simware();
        document.getElementById("inputFirmware").value = saveFirmware(SIMWARE)
    }
    compute_behavior("FIRE " + key)
}

function update_memories(preSIMWARE) {
    var i = 0;
    set_simware(preSIMWARE);
    var SIMWARE = get_simware();
    simhw_internalState_reset("MC", {});
    var mc_obj = simhw_internalState("MC");
    var mcelto = null;
    for (i = 0; i < SIMWARE["firmware"].length; i++) {
        var last = SIMWARE["firmware"][i]["microcode"].length;
        var mci = SIMWARE["firmware"][i]["mc-start"];
        for (var j = 0; j < last; j++) {
            var mcelto = {
                value: SIMWARE["firmware"][i]["microcode"][j],
                comments: SIMWARE["firmware"][i]["microcomments"][j],
                is_native: SIMWARE["firmware"][i].is_native,
                NATIVE: SIMWARE["firmware"][i].NATIVE,
                NATIVE_JIT: SIMWARE["firmware"][i].NATIVE_JIT
            };
            control_memory_set(mc_obj, mci, mcelto);
            mci++
        }
    }
    simhw_internalState_reset("ROM", {});
    for (i = 0; i < SIMWARE["firmware"].length; i++) {
        if ("begin" == SIMWARE["firmware"][i]["name"]) {
            continue
        }
        var ma = SIMWARE["firmware"][i]["mc-start"];
        var co = parseInt(SIMWARE["firmware"][i]["co"], 2);
        var cop = 0;
        if (typeof SIMWARE["firmware"][i]["cop"] != "undefined") {
            cop = parseInt(SIMWARE["firmware"][i]["cop"], 2)
        }
        var rom_addr = 64 * co + cop;
        simhw_internalState_set("ROM", rom_addr, ma);
        SIMWARE["cihash"][rom_addr] = SIMWARE["firmware"][i]["signature"]
    }
    simhw_internalState_reset("MP", {});
    var mp_obj = simhw_internalState("MP");
    var melto = null;
    for (var key in SIMWARE["mp"]) {
        melto = Object.assign({}, SIMWARE["mp"][key]);
        melto.value = parseInt(SIMWARE["mp"][key].value.replace(/ /g, ""), 2);
        main_memory_set(mp_obj, parseInt(key), melto)
    }
    simhw_internalState_reset("segments", {});
    for (var key in SIMWARE["seg"]) {
        simhw_internalState_set("segments", key, SIMWARE["seg"][key])
    }
    show_main_memory(mp_obj, 0, true, true);
    show_control_memory(mc_obj, 0, true)
}

function hex2float(hexvalue) {
    var sign = hexvalue & 2147483648 ? -1 : 1;
    var exponent = (hexvalue >> 23 & 255) - 127;
    var mantissa = 1 + (hexvalue & 8388607) / 8388608;
    var valuef = sign * mantissa * Math.pow(2, exponent);
    if (-127 === exponent)
        if (1 === mantissa) valuef = sign === 1 ? "+0" : "-0";
        else valuef = sign * ((hexvalue & 8388607) / 8388607) * Math.pow(2, -126);
    if (128 === exponent)
        if (1 === mantissa) valuef = sign === 1 ? "+Inf" : "-Inf";
        else valuef = "NaN";
    return valuef
}

function hex2char8(hexvalue) {
    var valuec = [];
    valuec[0] = String.fromCharCode((hexvalue & 4278190080) >> 24);
    valuec[1] = String.fromCharCode((hexvalue & 16711680) >> 16);
    valuec[2] = String.fromCharCode((hexvalue & 65280) >> 8);
    valuec[3] = String.fromCharCode((hexvalue & 255) >> 0);
    return valuec
}

function simcoreui_pack(val, pack_size) {
    var base_str = "0".repeat(pack_size);
    return base_str.substring(0, pack_size - val.length) + val
}

function hex2bin(hexvalue) {
    var valuebin = hexvalue.toString(2);
    valuebin = simcoreui_pack(valuebin, 32);
    valuebin = valuebin.substring(0, 4) + " " + valuebin.substring(4, 8) + " " + valuebin.substring(8, 12) + " " + valuebin.substring(12, 16) + "<br>" + valuebin.substring(16, 20) + " " + valuebin.substring(20, 24) + " " + valuebin.substring(24, 28) + " " + valuebin.substring(28, 32);
    return valuebin
}

function value2string(format, value) {
    var fmt_value = "";
    var fmt = format.split("_");
    switch (fmt[0]) {
        case "unsigned":
            fmt_value = value.toString(fmt[1]).toUpperCase();
            break;
        case "float":
            fmt_value = hex2float(value);
            break;
        case "char":
            fmt_value = "'" + String.fromCharCode(value) + "'";
            break;
        default:
            fmt_value = value.toString()
    }
    if (fmt[2] === "fill") {
        fmt_value = simcoreui_pack(fmt_value, 8)
    }
    return fmt_value
}

function show_rf_names() {
    return simcore_action_ui("CPU", 0, "show_rf_names")()
}

function get_screen_content() {
    return simcore_action_ui("SCREEN", 0, "get_screen_content")()
}

function set_screen_content(screen) {
    simcore_action_ui("SCREEN", 0, "set_screen_content")(screen)
}

function get_keyboard_content() {
    return simcore_action_ui("KBD", 0, "get_keyboard_content")()
}

function set_keyboard_content(keystrokes) {
    simcore_action_ui("KBD", 0, "set_keyboard_content")(keystrokes)
}

function show_main_memory(memory, index, redraw, updates) {
    return simcore_action_ui("MEMORY", 0, "show_main_memory")(memory, index, redraw, updates)
}

function show_control_memory(memory, index, redraw) {
    return simcore_action_ui("MEMORY", 0, "show_control_memory")(memory, index, redraw)
}

function show_memories_values() {
    var pc_name = simhw_sim_ctrlStates_get().pc.state;
    var reg_pc = get_value(simhw_sim_state(pc_name));
    show_main_memory(simhw_internalState("MP"), reg_pc, true, true);
    var maddr_name = simhw_sim_ctrlStates_get().mpc.state;
    var reg_maddr = get_value(simhw_sim_state(maddr_name));
    show_control_memory(simhw_internalState("MC"), reg_maddr, true)
}

function update_draw(obj, value) {
    return simcore_action_ui("CPU", 1, "update_draw")(obj, value)
}

function update_bus_visibility(bus_name, value) {
    return simcore_action_ui("CPU", 1, "update_bus_visibility")(bus_name, value)
}

function refresh() {
    for (var key in simhw_sim_signals()) {
        update_draw(simhw_sim_signals()[key], simhw_sim_signals()[key].value)
    }
    show_dbg_ir(get_value(simhw_sim_state("REG_IR_DECO")))
}

function show_dbg_ir(value) {
    return simcore_action_ui("MEMORY", 0, "show_dbg_ir")(value)
}

function show_dbg_mpc() {
    return simcore_action_ui("MEMORY", 0, "show_dbg_mpc")()
}

function show_asmdbg_pc() {
    return simcore_action_ui("MEMORY", 0, "show_asmdbg_pc")()
}

function ws_alert(msg) {
    if (typeof document === "undefined") {
        console.log(msg);
        return true
    }
    alert(msg);
    return true
}

function element_scroll_get(list_id) {
    var offset = 0;
    var obj_byid = $(list_id);
    if (obj_byid.length > 0) {
        offset = obj_byid[0].scrollTop
    }
    return offset
}

function element_scroll_set(list_id, offset) {
    var obj_byid = $(list_id);
    if (obj_byid.length > 0) {
        obj_byid[0].scrollTop = offset
    }
}

function element_scroll_setRelative(list_id, obj_id, offset) {
    var obj_byid = $(obj_id);
    if (obj_byid.length > 0) {
        var topPos = obj_byid[0].offsetTop;
        element_scroll_set(list_id, topPos + offset)
    }
}

function simcore_init(with_ui) {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    if (with_ui) {
        restore_cfg()
    } else {
        reset_cfg_values()
    }
    return ret
}

function simcore_init_hw(simhw_name) {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    var hwid = simhw_getIdByName(simhw_name);
    if (hwid < 0) {
        ret.msg = "ERROR: unknown hardware: " + simhw_name + ".<br>\n";
        ret.ok = false;
        return ret
    }
    simhw_setActive(hwid);
    var ret1 = simcore_init_ui({});
    if (false === ret1.ok) {
        ret.msg = ret.msg;
        ret.ok = false;
        return ret
    }
    return ret
}

function simcore_welcome() {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    console.log("");
    console.log("██╗    ██╗███████╗██████╗ ███████╗██╗███╗   ███╗");
    console.log("██║    ██║██╔════╝██╔══██╗██╔════╝██║████╗ ████║");
    console.log("██║ █╗ ██║█████╗  ██████╔╝███████╗██║██╔████╔██║");
    console.log("██║███╗██║██╔══╝  ██╔═══╝ ╚════██║██║██║╚██╔╝██║");
    console.log("╚███╔███╔╝███████╗██║     ███████║██║██║ ╚═╝ ██║");
    console.log(" ╚══╝╚══╝ ╚══════╝╚═╝     ╚══════╝╚═╝╚═╝     ╚═╝");
    console.log("");
    console.log("Stable: https://github.com/wepsim/wepsim");
    console.log("Beta:   https://github.com/acaldero/wepsim");
    console.log("");
    return ret
}

function simcore_init_ui(hash_detail2init) {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    var detail_id = 0;
    var sim_components = simhw_sim_components();
    for (var elto in sim_components) {
        sim_components[elto].details_ui = [];
        for (var index in sim_components[elto].details_name) {
            sim_components[elto].details_ui[index] = {};
            detail_id = sim_components[elto].details_name[index];
            if (typeof hash_detail2init[detail_id] !== "undefined") {
                sim_components[elto].details_ui[index] = hash_detail2init[detail_id];
                sim_components[elto].details_ui[index].init()
            }
        }
    }
    return ret
}

function simcore_action_ui(component_name, detail_id, action_name) {
    var sim_components = simhw_sim_components();
    if (typeof sim_components[component_name].details_ui[detail_id][action_name] === "undefined") {
        return simcore_do_nothing_handler
    }
    return sim_components[component_name].details_ui[detail_id][action_name]
}

function simcore_init_eventlistener(context, hash_detail2action, hash_signal2action) {
    var context_obj = null;
    var r = [];
    var o = null;
    context_obj = document.getElementById(context).contentDocument;
    if (null == context_obj) {
        console.log('warning: unreferenced graphic element context named "' + r[0] + '".');
        return
    }
    var sim_signals = simhw_sim_signals();
    for (var key in sim_signals) {
        if (typeof hash_signal2action[key + "click"] === "undefined") {
            hash_signal2action[key + "click"] = function(key_value) {
                return function() {
                    hash_signal2action["<all>"](key_value, "click")
                }
            }(key)
        }
        if (typeof hash_signal2action[key + "dblclick"] === "undefined") {
            hash_signal2action[key + "dblclick"] = function(key_value) {
                return function() {
                    hash_signal2action["<all>"](key_value, "dblclick")
                }
            }(key)
        }
        for (var j = 0; j < simhw_sim_signal(key).fire_name.length; j++) {
            r = simhw_sim_signal(key).fire_name[j].split(":");
            if (r[0] !== context) {
                continue
            }
            o = context_obj.getElementById(r[1]);
            if (null === o) {
                console.log('warning: unreferenced graphic element named "' + r[0] + ":" + r[1] + '".');
                continue
            }
            o.addEventListener("click", hash_signal2action[key + "click"], false);
            o.addEventListener("dblclick", hash_signal2action[key + "dblclick"], false)
        }
    }
    var sim_components = simhw_sim_components();
    for (var elto in sim_components) {
        for (var index in sim_components[elto].details_name) {
            var firename = sim_components[elto].details_name[index];
            if (typeof hash_detail2action[firename] === "undefined") {
                continue
            }
            for (var fireindex in sim_components[elto].details_fire[index]) {
                r = sim_components[elto].details_fire[index][fireindex].split(":");
                if (r[0] !== context) {
                    continue
                }
                o = context_obj.getElementById(r[1]);
                if (null === o) {
                    console.log('warning: unreferenced graphic element named "' + r[0] + ":" + r[1] + '".');
                    continue
                }
                o.addEventListener("click", hash_detail2action[firename], false)
            }
        }
    }
}

function simcore_check_if_can_execute() {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    var curr_segments = simhw_internalState("segments");
    if (typeof curr_segments[".ktext"] == "undefined" && typeof curr_segments[".text"] == "undefined") {
        ret.msg = "code segment .ktext/.text does not exist!<br>\n" + "Please load some assembly code.<br>";
        ret.ok = false;
        return ret
    }
    var SIMWARE = get_simware();
    if (!(typeof curr_segments[".ktext"] != "undefined" && SIMWARE.labels2.kmain) && !(typeof curr_segments[".text"] != "undefined" && SIMWARE.labels2.main)) {
        ret.msg = "labels 'kmain' (in .ktext) or 'main' (in .text) do not exist!";
        ret.ok = false;
        return ret
    }
    return ret
}

function simcore_packerror_at(reg_maddr, msg) {
    var ret = {};
    var hex_maddr = "0x" + parseInt(reg_maddr).toString(16);
    ret.ok = false;
    ret.msg = msg + " at maddr=" + hex_maddr + ".";
    return ret
}

function simcore_check_if_can_continue2(reg_maddr, reg_pc) {
    var ret = {};
    ret.ok = true;
    ret.msg = "";
    var curr_MC = simhw_internalState("MC");
    var mcelto = control_memory_get(curr_MC, reg_maddr);
    if (typeof mcelto === "undefined") {
        return simcore_packerror_at(reg_maddr, "Error: undefined microinstruction")
    }
    if (simhw_internalState_get("fire_visible", "databus") == true || simhw_internalState_get("fire_visible", "internalbus") == true) {
        return simcore_packerror_at(reg_maddr, "Error: two or more tri-states are active")
    }
    var curr_segments = simhw_internalState("segments");
    if (reg_pc < curr_segments[".ktext"].end && reg_pc >= curr_segments[".ktext"].begin) {
        return ret
    }
    if (reg_pc < curr_segments[".text"].end && reg_pc >= curr_segments[".text"].begin) {
        return ret
    }
    if (mcelto.is_native && 0 === reg_maddr) {
        if (reg_pc == curr_segments[".ktext"].end || reg_pc == curr_segments[".text"].end) {
            return ret
        }
    }
    if (false == mcelto.is_native && 0 !== reg_maddr) {
        if (reg_pc == curr_segments[".ktext"].end || reg_pc == curr_segments[".text"].end) {
            return ret
        }
    }
    ret.ok = false;
    ret.msg = "The program has finished because the PC register points outside .ktext/.text code segments";
    return ret
}

function simcore_check_if_can_continue() {
    var pc_name = simhw_sim_ctrlStates_get().pc.state;
    var reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
    var maddr_name = simhw_sim_ctrlStates_get().mpc.state;
    var reg_maddr = get_value(simhw_sim_state(maddr_name));
    return simcore_check_if_can_continue2(reg_maddr, reg_pc)
}

function simcore_reset() {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    var SIMWARE = get_simware();
    var curr_firm = simhw_internalState("FIRMWARE");
    var curr_segments = simhw_internalState("segments");
    var curr_MC = simhw_internalState("MC");
    var sim_components = simhw_sim_components();
    var ctrl_states = simhw_sim_ctrlStates_get();
    var pc_name = ctrl_states.pc.state;
    var pc_state = simhw_sim_state(pc_name);
    var sp_name = ctrl_states.sp.state;
    var sp_state = simhw_sim_state(sp_name);
    if (curr_firm.stackRegister != null) {
        sp_name = curr_firm.stackRegister;
        sp_state = simhw_sim_states().BR[sp_name];
        ctrl_states.sp.state = "BR." + curr_firm.stackRegister
    }
    for (var elto in sim_components) {
        var reset_signal_name = sim_components[elto].name + "_RESET";
        compute_general_behavior(reset_signal_name)
    }
    if (typeof curr_segments[".ktext"] !== "undefined" && SIMWARE.labels2.kmain) {
        set_value(pc_state, parseInt(SIMWARE.labels2.kmain));
        show_asmdbg_pc()
    } else if (typeof curr_segments[".text"] !== "undefined" && SIMWARE.labels2.main) {
        set_value(pc_state, parseInt(SIMWARE.labels2.main));
        show_asmdbg_pc()
    }
    if (typeof curr_segments[".stack"] !== "undefined" && typeof sp_state !== "undefined") {
        set_value(sp_state, parseInt(curr_segments[".stack"].end) & 4294967292)
    }
    var new_maddr = get_value(simhw_sim_state("MUXA_MICROADDR"));
    var mcelto = control_memory_get(curr_MC, new_maddr);
    if (typeof mcelto === "undefined") {
        mcelto = {
            value: simhw_sim_state("REG_MICROINS").default_value,
            is_native: false
        }
    }
    var new_mins = get_value(mcelto);
    if (false == mcelto.is_native) {
        compute_general_behavior("CLOCK")
    }
    show_dbg_ir(get_value(simhw_sim_state("REG_IR_DECO")));
    for (elto in sim_components) {
        for (var index in sim_components[elto].details_name) {
            if (typeof sim_components[elto].details_ui[index].reset !== "undefined") {
                sim_components[elto].details_ui[index].reset()
            }
        }
    }
    return ret
}

function simcore_execute_microinstruction() {
    var ret = simcore_check_if_can_continue();
    if (false === ret.ok) {
        return ret
    }
    compute_general_behavior("CLOCK");
    show_dbg_mpc();
    return ret
}

function simcore_execute_microinstruction2(reg_maddr, reg_pc) {
    var ret = simcore_check_if_can_continue2(reg_maddr, reg_pc);
    if (false === ret.ok) {
        return ret
    }
    compute_general_behavior("CLOCK");
    show_dbg_mpc();
    return ret
}

function simcore_execute_microprogram(options) {
    var ret = simcore_check_if_can_continue();
    if (false === ret.ok) {
        return ret
    }
    var before_state = null;
    var after_state = null;
    var curr_mpc = "";
    var curr_MC = simhw_internalState("MC");
    var maddr_name = simhw_sim_ctrlStates_get().mpc.state;
    var maddr_state = simhw_sim_state(maddr_name);
    if (typeof options.before_microinstruction === "undefined") {
        options.before_microinstruction = simcore_do_nothing_handler
    }
    if (typeof options.after_microinstruction === "undefined") {
        options.after_microinstruction = simcore_do_nothing_handler
    }
    var i_clks = 0;
    var limitless = options.cycles_limit < 0;
    var cur_addr = 0;
    var mcelto = null;
    var oolimits = false;
    do {
        options.before_microinstruction(curr_MC, cur_addr);
        compute_general_behavior("CLOCK");
        i_clks++;
        options.after_microinstruction(curr_MC, cur_addr);
        if (limitless === false && i_clks >= options.cycles_limit) {
            ret.msg = "Warning: clock cycles limit reached in a single instruction.";
            ret.ok = false;
            break
        }
        cur_addr = get_value(maddr_state);
        mcelto = control_memory_get(curr_MC, cur_addr);
        if (typeof mcelto === "undefined") {
            ret.msg = "Error: undefined microinstruction at " + cur_addr + ".";
            ret.ok = false;
            break
        }
        if (i_clks >= options.cycles_limit && -1 != options.cycles_limit) {
            oolimits = true
        }
    } while (false == oolimits && 0 != cur_addr);
    if (true == ret.ok && mcelto.is_native) {
        compute_general_behavior("CLOCK")
    }
    if (get_cfg("DBG_level") == "microinstruction") {
        show_dbg_mpc()
    }
    return ret
}

function simcore_execute_program(options) {
    var ret = {};
    ret.ok = true;
    ret.msg = "";
    var curr_segments = simhw_internalState("segments");
    var pc_name = simhw_sim_ctrlStates_get().pc.state;
    var pc_state = simhw_sim_state(pc_name);
    var reg_pc = get_value(pc_state);
    var reg_pc_before = get_value(pc_state) - 4;
    var code_begin = 0;
    if (typeof curr_segments[".text"] != "undefined" && typeof curr_segments[".text"].begin != "undefined") code_begin = parseInt(curr_segments[".text"].begin);
    var code_end = 0;
    if (typeof curr_segments[".text"] != "undefined" && typeof curr_segments[".text"].end != "undefined") code_end = parseInt(curr_segments[".text"].end);
    var kcode_begin = 0;
    if (typeof curr_segments[".ktext"] != "undefined" && typeof curr_segments[".ktext"].begin != "undefined") kcode_begin = parseInt(curr_segments[".ktext"].begin);
    var kcode_end = 0;
    if (typeof curr_segments[".ktext"] != "undefined" && typeof curr_segments[".ktext"].end != "undefined") kcode_end = parseInt(curr_segments[".ktext"].end);
    var ret1 = null;
    var before_state = null;
    var after_state = null;
    var curr_pc = "";
    var SIMWARE = get_simware();
    if (typeof options.verbalize !== "undefined") {
        set_cfg("verbal_verbose", options.verbalize)
    }
    if (typeof options.before_instruction === "undefined") {
        options.before_instruction = simcore_do_nothing_handler
    }
    if (typeof options.after_instruction === "undefined") {
        options.after_instruction = simcore_do_nothing_handler
    }
    var ins_executed = 0;
    while (reg_pc < code_end && reg_pc >= code_begin || reg_pc < kcode_end && reg_pc >= kcode_begin) {
        options.before_instruction(SIMWARE, reg_pc);
        ret1 = simcore_execute_microprogram(options);
        if (false === ret1.ok) {
            return ret1
        }
        options.after_instruction(SIMWARE, reg_pc);
        ins_executed++;
        if (ins_executed > options.instruction_limit && -1 != options.instruction_limit) {
            ret.ok = false;
            ret.msg = "more than " + options.instruction_limit + " instructions executed before application ends.";
            return ret
        }
        reg_pc_before = reg_pc;
        reg_pc = get_value(pc_state)
    }
    return ret
}

function simcore_do_nothing_handler() {
    return null
}

function simcore_compile_firmware(textToMCompile) {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    if ("" == textToMCompile) {
        ret.msg = "Empty Firmware";
        ret.ok = false;
        return ret
    }
    var preSM = null;
    try {
        preSM = loadFirmware(textToMCompile);
        ret.simware = preSM
    } catch (e) {
        ret.msg = "ERROR: at line: " + e.lineNumber + " and column: " + e.columnNumber;
        ret.ok = false;
        return ret
    }
    if (preSM.error != null) {
        ret.msg = preSM.error;
        ret.ok = false;
        return ret
    }
    update_memories(preSM);
    simcore_reset();
    return ret
}

function simcore_compile_assembly(textToCompile) {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    var SIMWARE = get_simware();
    if (SIMWARE.firmware.length === 0) {
        ret.msg = "Empty microcode, please load the microcode first.";
        ret.ok = false;
        return ret
    }
    var SIMWAREaddon = simlang_compile(textToCompile, SIMWARE);
    ret.simware = SIMWAREaddon;
    if (SIMWAREaddon.error != null) {
        ret.msg = SIMWAREaddon.error;
        ret.ok = false;
        return ret
    }
    set_simware(SIMWAREaddon);
    update_memories(SIMWARE);
    simcore_reset();
    return ret
}

function simcore_hardware_export(hw_name) {
    var ret = {};
    ret.msg = "{}";
    ret.ok = false;
    var hw_obj = simhw_getObjByName(hw_name);
    if (null === hw_obj) {
        return ret
    }
    ret.ok = true;
    ret.msg = JSON.stringify(hw_obj, (function(key, value) {
        if (typeof value === "function") {
            return "/Function(" + value.toString() + ")/"
        }
        return value
    }));
    return ret
}

function simcore_hardware_import(hw_json) {
    var ret = {};
    ret.msg = "";
    ret.ok = true;
    hw_obj = JSON.parse(hw_json, (function(key, value) {
        if (typeof value === "string" && value.startsWith("/Function(") && value.endsWith(")/")) {
            value = value.substring(10, value.length - 2);
            return eval("(" + value + ")")
        }
        return value
    }));
    simhw_add(hw_obj);
    return ret
}

function simcore_native_get_signal(elto) {
    return get_value(simhw_sim_signal(elto)) >>> 0
}

function simcore_native_set_signal(elto, value) {
    set_value(simhw_sim_signal(elto), value);
    compute_behavior("FIRE " + elto);
    return value
}

function simcore_native_get_value(component, elto) {
    var index = 0;
    var sim_components = simhw_sim_components();
    var compo_index = component;
    if ("BR" === component) compo_index = "CPU";
    if ("DEVICE" === component) compo_index = "IO";
    if (typeof sim_components[compo_index].get_value !== "undefined") {
        return sim_components[compo_index].get_value(elto)
    }
    return false
}

function simcore_native_set_value(component, elto, value) {
    var index = 0;
    var sim_components = simhw_sim_components();
    var compo_index = component;
    if ("BR" === component) compo_index = "CPU";
    if ("DEVICE" === component) compo_index = "IO";
    if (typeof sim_components[compo_index].set_value !== "undefined") {
        return sim_components[compo_index].set_value(elto, value)
    }
    return false
}

function simcore_native_get_fields(signature_raw) {
    var SIMWARE = get_simware();
    for (var key in SIMWARE.firmware) {
        if (SIMWARE.firmware[key].signatureRaw === signature_raw) {
            return SIMWARE.firmware[key].fields
        }
    }
}

function simcore_native_get_field_from_ir(fields, index) {
    if (typeof fields[index] === "undefined") {
        ws_alert("simcore_native_get_field_from_ir: index (" + index + ") out of range.");
        return false
    }
    var value = get_value(simhw_sim_state("REG_IR"));
    var left_shift = 31 - parseInt(fields[index].startbit);
    var right_shift = parseInt(fields[index].stopbit);
    value = value << left_shift;
    value = value >>> left_shift;
    value = value >>> right_shift;
    return value
}

function simcore_native_deco() {
    compute_behavior("DECO")
}

function simcore_native_go_maddr(maddr) {
    set_value(simhw_sim_state("MUXA_MICROADDR"), maddr)
}

function simcore_native_go_opcode() {
    var maddr = get_value(simhw_sim_state("ROM_MUXA"));
    set_value(simhw_sim_state("MUXA_MICROADDR"), maddr)
}

function simcore_native_go_instruction(signature_raw) {
    var SIMWARE = get_simware();
    for (var key in SIMWARE.firmware) {
        if (SIMWARE.firmware[key].signatureRaw === signature_raw) {
            var maddr = SIMWARE.firmware[key]["mc-start"];
            set_value(simhw_sim_state("MUXA_MICROADDR"), maddr);
            return
        }
    }
}

function simcore_simstate_checklist2state(checklist) {
    var o = {};
    var ret = false;
    checklist = checklist.replace(/;|==|!=|>=|<=|=|>|</gi, (function(x) {
        return " " + x + " "
    }));
    checklist = checklist.replace(/  /g, " ");
    var lines = checklist.split(";");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if ("" === line) continue;
        var parts = line.split(" ");
        if (parts.length < 4) continue;
        var check = {
            type: parts[0],
            id: parts[1],
            condition: parts[2],
            value: decodeURI(parts[3])
        };
        for (var index in simhw_sim_components()) {
            ret = simhw_sim_component(index).read_state(o, check);
            if (true === ret) break
        }
        if (false === ret) {
            console.log("ERROR in checklist at component " + check.type + ": " + line)
        }
    }
    return o
}

function simcore_simstate_current2state() {
    var o = {};
    for (var index in simhw_sim_components()) {
        simhw_sim_component(index).write_state(o)
    }
    return o
}

function simcore_simstate_expandfilter(filter) {
    var first_value = 0;
    var last_value = 0;
    var elto = null;
    var j = 0;
    var filter_ext = [];
    var filter_base = filter.toUpperCase().split(/[,;:]+/).filter((v => v != ""));
    for (var i = 0; i < filter_base.length; i++) {
        elto = filter_base[i].split("-");
        if (elto.length == 1) {
            filter_ext.push(filter_base[i]);
            continue
        }
        if (elto[0].startsWith("0X")) {
            first_value = parseInt(elto[0], 16);
            last_value = parseInt(elto[1], 16);
            for (j = first_value; j <= last_value; j++) {
                filter_ext.push("0X" + j.toString(16))
            }
            continue
        }
        if (elto[0].startsWith("R")) {
            elto[0] = elto[0].replace("R", "0");
            elto[1] = elto[1].replace("R", "0");
            first_value = parseInt(elto[0], 10);
            last_value = parseInt(elto[1], 10);
            for (j = first_value; j <= last_value; j++) {
                filter_ext.push("R" + j.toString(16))
            }
        }
    }
    return filter_ext
}

function simcore_simstate_state2checklist(s_obj, filter) {
    var ret = "";
    var filter_ext = simcore_simstate_expandfilter(filter);
    for (var component in s_obj) {
        for (var eltos in s_obj[component]) {
            var elto = s_obj[component][eltos];
            var elto_id = elto.id.toString().toUpperCase();
            if (filter_ext.length != 0 && filter_ext.indexOf(elto_id) == -1) {
                continue
            }
            ret = ret + elto.type + " " + elto.id + " " + elto.op + " " + encodeURI(elto.value) + "; "
        }
    }
    return ret
}

function simcore_simstate_check_results(expected_result, obtained_result, newones_too) {
    var d = {};
    d.result = [];
    d.errors = 0;
    d.neltos_expected = 0;
    d.neltos_obtained = 0;
    var elto = null;
    var diff = {};
    var obtained_value = 0;
    for (var compo in simhw_sim_components()) {
        if (typeof expected_result[compo] != "undefined") {
            for (elto in expected_result[compo]) {
                d.neltos_expected++;
                obtained_value = expected_result[compo][elto].default_value;
                if (typeof obtained_result[compo] != "undefined" && typeof obtained_result[compo][elto] != "undefined") {
                    obtained_value = obtained_result[compo][elto].value
                }
                diff = {};
                diff.expected = expected_result[compo][elto].value;
                diff.obtained = obtained_value;
                diff.elto_type = compo.toLowerCase();
                diff.elto_id = expected_result[compo][elto].id;
                diff.elto_op = expected_result[compo][elto].op;
                diff.fulfill = false;
                if ("=" === expected_result[compo][elto].op) diff.fulfill = parseInt(diff.obtained) == parseInt(diff.expected);
                else if (">" === expected_result[compo][elto].op) diff.fulfill = parseInt(diff.obtained) > parseInt(diff.expected);
                else if ("<" === expected_result[compo][elto].op) diff.fulfill = parseInt(diff.obtained) < parseInt(diff.expected);
                else if (">=" === expected_result[compo][elto].op) diff.fulfill = parseInt(diff.obtained) >= parseInt(diff.expected);
                else if ("<=" === expected_result[compo][elto].op) diff.fulfill = parseInt(diff.obtained) <= parseInt(diff.expected);
                else if ("==" === expected_result[compo][elto].op) diff.fulfill = diff.expected == diff.obtained;
                else if ("!=" === expected_result[compo][elto].op) diff.fulfill = diff.expected != diff.obtained;
                d.result.push(diff);
                if (diff.fulfill === false) d.errors++
            }
        }
        if (newones_too && typeof obtained_result[compo] != "undefined") {
            for (elto in obtained_result[compo]) {
                d.neltos_obtained++;
                if (typeof expected_result[compo] != "undefined" && typeof expected_result[compo][elto] != "undefined") {
                    continue
                }
                diff = {};
                diff.expected = obtained_result[compo][elto].default_value;
                diff.obtained = obtained_result[compo][elto].value;
                diff.fulfill = diff.expected === diff.obtained;
                diff.elto_type = compo.toLowerCase();
                diff.elto_id = obtained_result[compo][elto].id;
                diff.elto_op = "=";
                d.result.push(diff);
                if (diff.fulfill === false) d.errors++
            }
        }
    }
    return d
}

function simcore_simstate_diff_results(expected_result, obtained_result) {
    return simcore_simstate_check_results(expected_result, obtained_result, true)
}

function simcore_simstate_diff_states(before_state_obj, after_state_obj) {
    var before_arr = simcore_simstate_state2checklist(before_state_obj, "").split(";");
    var after_arr = simcore_simstate_state2checklist(after_state_obj, "").split(";");
    return after_arr.filter((function(elto) {
        return !before_arr.includes(elto)
    })).join(";").trim()
}

function simcore_simstate_checkreport2txt(checklist) {
    var o = "";
    for (var i = 0; i < checklist.length; i++) {
        if (checklist[i].fulfill === false) {
            o += checklist[i].elto_type + "[" + checklist[i].elto_id + "]='" + checklist[i].obtained + "' (expected '" + checklist[i].expected + "'), "
        }
    }
    return o
}

function simcore_simstate_checkreport2html(checklist, only_errors) {
    var o = "";
    var color = "green";
    if (typeof only_errors === "undefined") only_errors = false;
    o += "<table style='margin:0 0 0 0;' " + "       class='table table-hover table-bordered table-sm'>" + "<thead>" + "<tr>" + "<th>Type</th>" + "<th><span class='d-none d-sm-inline-flex'>Identification</span><span class='d-sm-none'>Id.</span></th>" + "<th><span class='d-none d-sm-inline-flex'>Values in the</span> clipboard <span class='d-none d-sm-inline-flex'>state</th>" + "<th><span class='d-none d-sm-inline-flex'>Values in the</span> selected <span class='d-none d-sm-inline-flex'>state</th>" + "</tr>" + "</thead>" + "<tbody>";
    for (var i = 0; i < checklist.length; i++) {
        if (checklist[i].fulfill === false) color = "table-danger";
        else color = "table-success";
        if (only_errors && checklist[i].fulfill) continue;
        o += "<tr class=" + color + ">" + "<td>" + checklist[i].elto_type + "</td>" + "<td>" + checklist[i].elto_id + "</td>" + "<td>" + checklist[i].elto_op + "&nbsp;" + checklist[i].expected + "</td>" + "<td>" + checklist[i].obtained + "</td>" + "</tr>"
    }
    o += "</tbody>" + "</table>";
    return o
}

function simcore_voice_canSpeak() {
    if (typeof window.speechSynthesis == "undefined") {
        return false
    }
    if (false === get_cfg("use_voice")) {
        return false
    }
    return true
}

function simcore_voice_speak(msg) {
    var ssu = null;
    if (simcore_voice_canSpeak()) {
        ssu = new SpeechSynthesisUtterance(msg);
        ssu.lang = "es-ES";
        if ("en" == get_cfg("ws_idiom")) ssu.lang = "en-US";
        if ("es" == get_cfg("ws_idiom")) ssu.lang = "es-EN";
        window.speechSynthesis.speak(ssu)
    }
}

function simcore_voice_stopSpeak() {
    if (simcore_voice_canSpeak()) {
        window.speechSynthesis.cancel()
    }
}
var simcore_rest = {};

function simcore_rest_reset() {
    simcore_rest = {}
}

function simcore_rest_add(name, description) {
    simcore_rest[name] = {
        endpoint: description.endpoint,
        user: description.user,
        pass: description.pass,
        last_request: null
    }
}

function simcore_rest_list() {
    return simcore_rest
}

function simcore_rest_get(name) {
    return simcore_rest[name]
}

function simcore_rest_call(name, method, uri, data) {
    var rest_info = simcore_rest[name];
    if (typeof rest_info === "undefined") {
        return false
    }
    var api_endpoint = rest_info.endpoint;
    if (api_endpoint.value instanceof Vuex.Store) {
        api_endpoint = get_value(api_endpoint)
    }
    if (api_endpoint.trim() === "") {
        return false
    }
    var basic_auth = "Basic " + btoa(rest_info.user + ":" + rest_info.pass);
    var enc_data = JSON.stringify(data);
    var request = {
        url: api_endpoint + uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        dataType: "json",
        data: enc_data,
        beforeSend: function(xhr) {
            if (rest_info.user.trim() !== "") {
                xhr.setRequestHeader("Authorization", basic_auth)
            }
        },
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status)
        }
    };
    rest_info.last_request = $.ajax(request);
    return true
}
var simcore_notifications = [];

function simcore_notifications_get() {
    return simcore_notifications
}

function simcore_notifications_reset() {
    simcore_notifications = []
}

function simcore_notifications_add2(ntf) {
    simcore_notifications.push({
        title: ntf.title,
        message: ntf.message,
        type: ntf.type,
        date: ntf.date
    })
}

function simcore_notifications_add(ntf_title, ntf_message, ntf_type, ntf_delay) {
    simcore_notifications.push({
        title: $("<p>").html(ntf_title).text(),
        message: $("<p>").html(ntf_message).text(),
        type: ntf_type,
        date: (new Date).getTime()
    })
}

function get_value(sim_obj) {
    if (sim_obj.value instanceof Vuex.Store) {
        return sim_obj.value.state.value
    }
    return sim_obj.value
}

function set_value(sim_obj, value) {
    if (sim_obj.value instanceof Vuex.Store) {
        sim_obj.value.commit("set_value", value);
        return
    }
    var old_value = sim_obj.value;
    sim_obj.value = value;
    if (old_value != value) {
        sim_obj.changed = true
    }
}

function reset_value(sim_obj) {
    if (sim_obj.value instanceof Vuex.Store) {
        set_value(sim_obj, sim_obj.default_value);
        return
    }
    if (typeof sim_obj.default_value == "object") {
        sim_obj.changed = true;
        sim_obj.value = Object.create(sim_obj.default_value);
        return
    }
    if (sim_obj instanceof Array) {
        sim_obj.changed = true;
        for (var i = 0; i < sim_obj.length; i++) {
            set_value(sim_obj[i], sim_obj[i].default_value)
        }
        return
    }
    var old_value = sim_obj.value;
    set_value(sim_obj, sim_obj.default_value);
    if (old_value != sim_obj.default_value) {
        sim_obj.changed = true
    }
}

function update_value(sim_obj) {
    if (sim_obj.value instanceof Vuex.Store) {
        sim_obj.value.commit("inc_updates");
        return
    }
    sim_obj.changed = true
}

function get_var(sim_var) {
    if (sim_var instanceof Vuex.Store) {
        return sim_var.state.value
    }
    return sim_var
}

function set_var(sim_var, value) {
    if (sim_var instanceof Vuex.Store) {
        sim_var.commit("set_value", value);
        return
    }
    sim_var = value
}

function value_toString(elto_v) {
    if (typeof elto_v == "undefined") {
        return "-"
    }
    if (elto_v instanceof Vuex.Store) {
        elto_v = elto_v.state.value
    }
    if (typeof elto_v == "object") {
        return "object"
    }
    elto_v = "0x" + elto_v.toString(16);
    return elto_v
}

function vue_observable(initial_value) {
    if (typeof Vuex === "undefined") {
        return Vuex
    }
    return new Vuex.Store({
        state: {
            value: initial_value,
            updates: 0
        },
        mutations: {
            set_value(state, newValue) {
                state.value = newValue
            },
            set_value_at(state, index, newValue) {
                state.value[index] = newValue
            },
            inc_updates(state) {
                state.updates++
            }
        }
    })
}

function vue_appyBinding(r_value, vue_context, f_computed_value) {
    if (typeof Vue === "undefined") {
        return Vue
    }
    return new Vue({
        el: vue_context,
        store: r_value,
        computed: {
            value: {
                get() {
                    if (typeof this.$store.state == "undefined") return 0;
                    return this.$store.state.value
                },
                set(newValue) {
                    this.$store.commit("set_value", newValue)
                }
            },
            computed_value() {
                this.$store.state.updates;
                return f_computed_value(this.$store.state.value)
            }
        },
        methods: {
            set_value(newValue) {
                this.$store.commit("set_value", newValue)
            },
            set_value_at(index, newValue) {
                this.$store.commit("set_value_at", index, newValue)
            },
            inc_updates() {
                this.$store.commit("inc_updates")
            }
        }
    })
}

function vue_rebind_state(ref_obj, id_elto, f_computed_value) {
    if (typeof Vue === "undefined") {
        return Vue
    }
    if (false == ref_obj.value instanceof Vuex.Store) {
        ref_obj.value = vue_observable(ref_obj.value)
    }
    if (typeof f_computed_value === "undefined") {
        f_computed_value = function(value) {
            return value
        }
    }
    vue_appyBinding(ref_obj.value, id_elto, f_computed_value)
}

function control_memory_getkeys(memory) {
    return Object.keys(memory)
}

function control_memory_get(memory, elto) {
    return memory[elto]
}

function control_memory_set(memory, elto, melto) {
    if (typeof melto.changed === "undefined") melto.changed = false;
    if (typeof melto.state === "undefined") melto.state = false;
    if (typeof melto.breakpoint === "undefined") melto.breakpoint = false;
    if (typeof melto.notify === "undefined") melto.notify = [];
    if (typeof melto.is_native === "undefined") melto.is_native = false;
    var comments_str = "";
    if (null != melto.comments) {
        comments_str = melto.comments;
        if (melto.comments instanceof Array) comments_str = melto.comments.join("\n");
        melto.state = melto.state || comments_str.trim().split("state:").length > 1;
        melto.breakpoint = melto.breakpoint || comments_str.trim().split("break:").length > 1;
        melto.notify = comments_str.trim().split("notify:");
        for (var k = 0; k < melto.notify.length; k++) {
            melto.notify[k] = melto.notify[k].split("\n")[0]
        }
    }
    var valobj = memory[elto];
    if (typeof valobj !== "undefined") {
        set_value(valobj, melto.value);
        valobj.changed = melto.changed;
        if (null != melto.comments) {
            valobj.comments = melto.comments;
            valobj.state = melto.state;
            valobj.breakpoint = melto.breakpoint;
            valobj.notify = melto.notify
        }
        return valobj
    }
    memory[elto] = melto;
    return valobj
}

function control_memory_lineToString(memory, key) {
    var mcelto = control_memory_get(memory, key);
    if (typeof mcelto === "undefined") {
        return ""
    }
    if (mcelto.is_native) {
        if (typeof mcelto.NATIVE_JIT === "function") return "&lt;built-in&gt; ";
        else return "&lt;native&gt; "
    }
    var value = "";
    var mc_val = get_value(mcelto);
    for (var ks in mc_val) {
        if (1 == mc_val[ks]) value += ks + " ";
        else value += ks + "=" + parseInt(mc_val[ks]).toString(2) + " "
    }
    return value
}

function get_verbal_from_current_mpc() {
    var active_signals = "";
    var active_verbal = "";
    var maddr_name = simhw_sim_ctrlStates_get().mpc.state;
    var curr_maddr = get_value(simhw_sim_state(maddr_name));
    var mcelto = simhw_internalState_get("MC", curr_maddr);
    var mins = get_value(mcelto);
    for (var key in mins) {
        if ("MADDR" === key) {
            active_verbal = active_verbal + "MADDR is " + mins[key] + ". ";
            continue
        }
        active_signals = active_signals + key + " ";
        active_verbal = active_verbal + compute_signal_verbals(key, mins[key])
    }
    active_signals = active_signals.trim();
    if (active_signals === "") active_signals = "<no active signal>";
    if (active_verbal.trim() === "") active_verbal = "<no actions>";
    return "Activated signals are: " + active_signals + ". Associated actions are: " + active_verbal
}

function main_memory_getkeys(memory) {
    return Object.keys(memory)
}

function main_memory_get(memory, elto) {
    return memory[elto]
}

function main_memory_set(memory, elto, melto) {
    if (typeof melto.changed === "undefined") melto.changed = false;
    if (typeof melto.state === "undefined") melto.state = false;
    if (typeof melto.breakpoint === "undefined") melto.breakpoint = false;
    if (typeof melto.notify === "undefined") melto.notify = [];
    if (typeof melto.is_assembly === "undefined") melto.is_assembly = false;
    if (typeof melto.bgcolor === "undefined") melto.bgcolor = "";
    if (typeof melto.source === "undefined") melto.source = "";
    var comments_str = "";
    if (null != melto.comments) {
        comments_str = melto.comments.join("\n");
        melto.state = melto.state || comments_str.trim().split("state:").length > 1;
        melto.breakpoint = melto.breakpoint || comments_str.trim().split("break:").length > 1;
        melto.notify = comments_str.trim().split("notify:");
        for (var k = 0; k < melto.notify.length; k++) {
            melto.notify[k] = melto.notify[k].split("\n")[0]
        }
    }
    var valobj = memory[elto];
    if (typeof valobj !== "undefined") {
        set_value(valobj, melto.value);
        valobj.changed = melto.changed;
        if (null != melto.source_tracking) {
            valobj.source_tracking = melto.source_tracking
        }
        if (null != melto.comments) {
            valobj.comments = melto.comments;
            valobj.state = melto.state;
            valobj.breakpoint = melto.breakpoint;
            valobj.notify = melto.notify
        }
        return valobj
    }
    memory[elto] = melto;
    return valobj
}

function main_memory_getvalue(memory, elto) {
    var valobj = memory[elto];
    if (typeof valobj === "undefined") {
        return valobj
    }
    return get_value(valobj)
}

function main_memory_getsrc(memory, elto) {
    var src = "";
    var valobj = memory[elto];
    if (typeof valobj === "undefined") {
        return src
    }
    if (typeof valobj.source_tracking === "undefined") {
        return src
    }
    if (valobj.source_tracking == null) {
        return src
    }
    src = valobj.source_tracking;
    if (Array.isArray(src)) {
        src = src.join(";")
    }
    if (typeof src == "string") {
        src = src.replace(/'/g, "").replace(/"/g, "")
    }
    return src
}

function main_memory_getword(memory, elto) {
    var value = "0";
    if (typeof memory[elto] !== "undefined") {
        value = get_value(memory[elto]).toString(16)
    }
    value = simcoreui_pack(value, 8);
    var value4 = [];
    for (var i = 0; i < 4; i++) {
        value4[i] = value[2 * i].toUpperCase() + value[2 * i + 1].toUpperCase()
    }
    return value4
}

function main_memory_fusionvalues(dbvalue, value, filter) {
    if (0 == (filter & 12)) {
        if (0 == (filter & 3)) dbvalue = dbvalue & 4294967040 | value & 255;
        if (1 == (filter & 3)) dbvalue = dbvalue & 4294902015 | value & 65280;
        if (2 == (filter & 3)) dbvalue = dbvalue & 4278255615 | value & 16711680;
        if (3 == (filter & 3)) dbvalue = dbvalue & 16777215 | value & 4278190080
    } else if (4 == (filter & 12)) {
        if (0 == (filter & 2)) dbvalue = dbvalue & 4294901760 | value & 65535;
        if (1 == (filter & 2)) dbvalue = dbvalue & 65535 | value & 4294901760
    } else {
        dbvalue = value
    }
    return dbvalue
}

function main_memory_extractvalues(value, filter_size, filter_elto) {
    var dbvalue = 0;
    switch (filter_size) {
        case 0:
            if (0 == filter_elto) dbvalue = value & 255;
            if (1 == filter_elto) dbvalue = (value & 65280) >> 8;
            if (2 == filter_elto) dbvalue = (value & 16711680) >> 16;
            if (3 == filter_elto) dbvalue = (value & 4278190080) >> 24;
            break;
        case 1:
            if (0 == filter_elto) dbvalue = value & 65535;
            if (1 == filter_elto) dbvalue = value & 65535;
            if (2 == filter_elto) dbvalue = (value & 4294901760) >> 16;
            if (3 == filter_elto) dbvalue = (value & 4294901760) >> 16;
            break;
        case 2:
            if (0 == filter_elto) dbvalue = value & 16777215;
            if (1 == filter_elto) dbvalue = value & 4294967040;
            break;
        case 3:
            dbvalue = value;
            break
    }
    return dbvalue
}

function main_memory_updatevalues(value, dbvalue, filter_size, filter_elto) {
    switch (filter_size) {
        case 0:
            if (0 == filter_elto) value = value & 4294967040 | dbvalue & 255;
            if (1 == filter_elto) value = value & 4294902015 | (dbvalue & 255) << 8;
            if (2 == filter_elto) value = value & 4278255615 | (dbvalue & 255) << 16;
            if (3 == filter_elto) value = value & 16777215 | (dbvalue & 255) << 24;
            break;
        case 1:
            if (0 == filter_elto) value = value & 4294901760 | dbvalue & 65535;
            if (1 == filter_elto) value = value & 4294901760 | dbvalue & 65535;
            if (2 == filter_elto) value = value & 65535 | (dbvalue & 65535) << 16;
            if (3 == filter_elto) value = value & 65535 | (dbvalue & 65535) << 16;
            break;
        case 2:
            if (0 == filter_elto) value = value & 4278190080 | dbvalue & 16777215;
            if (1 == filter_elto) value = value & 255 | dbvalue & 4294967040;
            break;
        case 3:
            value = dbvalue;
            break
    }
    return value
}

function main_memory_get_program_counter() {
    var r_ref = simhw_sim_ctrlStates_get().pc;
    var r_value = null;
    if (typeof r_ref !== "undefined") {
        r_ref = simhw_sim_state(r_ref.state)
    }
    if (typeof r_ref !== "undefined") {
        r_value = get_value(r_ref)
    }
    return r_value
}

function main_memory_get_baseaddr() {
    var r_ref = simhw_sim_ctrlStates_get();
    if (typeof r_ref === "undefined") {
        return null
    }
    var parts = null;
    var r_value = 0;
    var r_ref2 = null;
    var all_baseaddr = {};
    for (var elto in r_ref) {
        if (r_ref[elto].is_pointer == false) {
            continue
        }
        parts = r_ref[elto].state.split(".");
        if (parts[0] == "BR") {
            r_value = 4294967292;
            r_ref2 = simhw_sim_states().BR[parts[1]]
        } else {
            r_value = 0;
            r_ref2 = simhw_sim_state(r_ref[elto].state)
        }
        if (typeof r_ref2 !== "undefined") {
            r_value = get_value(r_ref2)
        }
        all_baseaddr[elto] = r_value
    }
    return all_baseaddr
}

function get_deco_from_pc(pc) {
    var mp_obj = simhw_internalState("MP");
    if (typeof mp_obj === "undefined" || typeof mp_obj[pc] === "undefined" || typeof mp_obj[pc].source === "undefined") {
        return ""
    }
    return mp_obj[pc].source
}

function get_verbal_from_current_pc() {
    var pc_name = simhw_sim_ctrlStates_get().pc.state;
    var reg_pc = get_value(simhw_sim_state(pc_name));
    var pc = parseInt(reg_pc) - 4;
    var decins = get_deco_from_pc(pc);
    if ("" == decins.trim()) {
        decins = "not jet defined"
    }
    return "Current instruction is: " + decins + " and PC points to " + show_value(pc) + ". "
}
var sim = {
    systems: [],
    active: null,
    index: 0
};

function simhw_add(newElto) {
    var found = -1;
    for (var m = 0; m < sim.systems.length; m++) {
        if (sim.systems[m].sim_short_name == newElto.sim_short_name) {
            sim.systems[m] = newElto;
            sim.index = m;
            found = m
        }
    }
    if (-1 == found) {
        sim.systems.push(newElto);
        sim.index = sim.systems.length - 1
    }
    sim.active = newElto;
    sim[newElto.sim_short_name] = newElto;
    check_behavior();
    compile_behaviors();
    firedep_to_fireorder(jit_fire_dep);
    compute_references();
    compile_verbals()
}

function simhw_getActive() {
    return sim.index
}

function simhw_setActive(newActive) {
    if (newActive >= 0 && sim.systems.length >= newActive) {
        sim.active = sim.systems[newActive];
        sim.index = newActive
    }
    compile_behaviors();
    firedep_to_fireorder(jit_fire_dep);
    compute_references();
    compile_verbals()
}

function simhw_getIdByName(short_name) {
    for (var m = 0; m < sim.systems.length; m++) {
        if (sim.systems[m].sim_short_name == short_name) {
            return m
        }
    }
    return -1
}

function simhw_getObjByName(short_name) {
    for (var m = 0; m < sim.systems.length; m++) {
        if (sim.systems[m].sim_short_name == short_name) {
            return sim.systems[m]
        }
    }
    return null
}

function simhw_active() {
    return sim.active
}

function simhw_short_name() {
    return sim.active.sim_short_name
}

function simhw_sim_signals() {
    return sim.active.signals
}

function simhw_sim_signal(id) {
    return sim.active.signals[id]
}

function simhw_sim_states() {
    return sim.active.states
}

function simhw_sim_state(id) {
    return sim.active.states[id]
}

function simhw_syntax_behaviors() {
    return sim.active.behaviors
}

function simhw_syntax_behavior(id) {
    return sim.active.behaviors[id]
}

function simhw_sim_components() {
    return sim.active.components
}

function simhw_sim_component(id) {
    return sim.active.components[id]
}

function simhw_internalState(name) {
    return sim.active.internal_states[name]
}

function simhw_internalState_get(name, id) {
    return sim.active.internal_states[name][id]
}

function simhw_internalState_set(name, id, val) {
    sim.active.internal_states[name][id] = val
}

function simhw_internalState_reset(name, val) {
    sim.active.internal_states[name] = val
}

function simhw_sim_ctrlStates_get() {
    return sim.active.ctrl_states
}
var ws_hw_hash = {};
var ws_hw_set = [];

function simhw_hwset_init() {
    var url_list = get_cfg("hw_url");
    ws_hw_set = wepsim_url_getJSON(url_list);
    for (var i = 0; i < ws_hw_set.length; i++) {
        ws_hw_hash[ws_hw_set[i].name] = ws_hw_set[i].url
    }
    return ws_hw_hash
}

function simhw_hwset_getSet() {
    return ws_hw_hash
}

function simhw_hwset_loadAll() {
    var jobj = {};
    for (var i = 0; i < ws_hw_set.length; i++) {
        jobj = $.getJSON({
            url: ws_hw_set[i].url,
            async: false
        });
        simcore_hardware_import(jobj.responseText)
    }
    return true
}

function simhw_hwset_load(p_name) {
    if (typeof ws_hw_hash[p_name] === "undefined") {
        return false
    }
    var jobj = $.getJSON({
        url: ws_hw_hash[p_name],
        async: false
    });
    simcore_hardware_import(jobj.responseText);
    return true
}
var sim_references = {};

function compute_references() {
    for (var key in simhw_sim_signals()) {
        sim_references[key] = simhw_sim_signal(key);
        simhw_sim_signal(key).changed = false
    }
    for (key in simhw_sim_states()) {
        sim_references[key] = simhw_sim_state(key);
        simhw_sim_state(key).changed = false
    }
}

function get_reference(sim_name) {
    return sim_references[sim_name]
}

function show_verbal(key) {
    var vn = simhw_sim_state(key);
    if (typeof vn == "undefined") vn = simhw_sim_signal(key);
    if ("undefined" == typeof vn) return key;
    if ("undefined" == typeof vn.verbal) return key;
    return vn.verbal
}

function show_value(value) {
    if (isNaN(value)) {
        return "NaN"
    }
    return "0x" + (value >>> 0).toString(16)
}

function check_behavior() {
    if (0 == simhw_sim_signals().length) {
        ws_alert("ALERT: empty signals!!!")
    }
    if (0 == simhw_sim_states().length) {
        ws_alert("ALERT: empty states!!!")
    }
    for (var key in simhw_sim_signals()) {
        for (var key2 in simhw_sim_signal(key).behavior) {
            var behaviors = simhw_sim_signal(key).behavior[key2].split(";");
            for (var i = 0; i < behaviors.length; i++) {
                var behavior_i = behaviors[i].trim();
                var behavior_k = behavior_i.split(" ");
                if ("" == behavior_i) {
                    continue
                }
                if (typeof simhw_syntax_behavior(behavior_k[0]) == "undefined") {
                    ws_alert("ALERT: Unknown operation -> " + behavior_k[0] + " (" + behavior_i + ")");
                    return
                }
                if (behavior_k.length != simhw_syntax_behavior(behavior_k[0]).nparameters) {
                    ws_alert("ALERT: Behavior has an incorrect number of elements --\x3e " + behavior_i + "/" + simhw_syntax_behavior(behavior_k[0]).nparameters);
                    return
                }
                for (var j = 1; j < behavior_k.length; j++) {
                    var s = behavior_k[j].split("/");
                    var t = simhw_syntax_behavior(behavior_k[0]).types[j - 1];
                    if ("E" == t && typeof simhw_sim_state(s[0]) == "undefined") {
                        ws_alert("ALERT: Behavior has an undefined reference to a object state -> '" + behavior_i);
                        return
                    } else if ("S" == t && typeof simhw_sim_signal(s[0]) == "undefined") {
                        ws_alert("ALERT: Behavior has an undefined reference to a signal -> '" + behavior_i);
                        return
                    } else if ("X" == t && typeof simhw_sim_state(s[0]) == "undefined" && typeof simhw_sim_signal(s[0]) == "undefined") {
                        ws_alert("ALERT: Behavior has an undefined reference to a object state OR signal -> '" + behavior_i);
                        return
                    }
                }
            }
        }
    }
}
var jit_behaviors = false;
var jit_verbals = false;
var jit_fire_dep = null;
var jit_fire_order = null;
var jit_dep_network = null;
var jit_fire_ndep = null;

function firedep_to_fireorder(jit_fire_dep) {
    var allfireto = false;
    jit_fire_order = [];
    jit_fire_ndep = [];
    for (var sig in simhw_sim_signals()) {
        if (typeof jit_fire_dep[sig] == "undefined") {
            jit_fire_order.push(sig);
            continue
        }
        ndep = 0;
        allfireto = false;
        for (var sigorg in jit_fire_dep[sig]) {
            ndep++;
            if (jit_fire_dep[sig][sigorg] == simhw_sim_signal(sigorg).behavior.length) {
                allfireto = true
            }
        }
        jit_fire_ndep[sig] = ndep;
        if (allfireto == false) jit_fire_order.push(sig)
    }
}

function compile_behaviors() {
    var jit_bes = "";
    jit_fire_dep = {};
    var sig_obj = null;
    var expr_obj = null;
    for (var sig in simhw_sim_signals()) {
        jit_bes += "simhw_sim_signal('" + sig + "').behavior_fn = new Array();\n";
        for (var val in simhw_sim_signal(sig).behavior) {
            var input_behavior = simhw_sim_signal(sig).behavior[val];
            var jit_be = "";
            var s_exprs = input_behavior.split(";");
            for (var i = 0; i < s_exprs.length; i++) {
                s_exprs[i] = s_exprs[i].trim();
                if ("" == s_exprs[i]) continue;
                var s_expr = s_exprs[i].split(" ");
                if (s_expr[0] != "NOP") jit_be += "simhw_syntax_behavior('" + s_expr[0] + "').operation(" + JSON.stringify(s_expr) + ");\t";
                if ("FIRE" == s_expr[0]) {
                    sig_obj = simhw_sim_signal(sig);
                    expr_obj = simhw_sim_signal(s_expr[1]);
                    if (typeof expr_obj == "undefined") {
                        ws_alert("ERROR: for signal '" + sig + "', unknow behavior '" + s_exprs[i] + "'")
                    } else if (sig_obj.type == expr_obj.type) {
                        if (typeof jit_fire_dep[s_expr[1]] == "undefined") jit_fire_dep[s_expr[1]] = {};
                        if (typeof jit_fire_dep[s_expr[1]][sig] == "undefined") jit_fire_dep[s_expr[1]][sig] = 0;
                        jit_fire_dep[s_expr[1]][sig]++
                    }
                }
            }
            jit_bes += "simhw_sim_signal('" + sig + "').behavior_fn[" + val + "] = \t function() {" + jit_be + "};\n"
        }
    }
    eval(jit_bes);
    jit_behaviors = true
}

function compute_behavior(input_behavior) {
    var s_exprs = input_behavior.split(";");
    for (var i = 0; i < s_exprs.length; i++) {
        s_exprs[i] = s_exprs[i].trim();
        if ("" == s_exprs[i]) continue;
        var s_expr = s_exprs[i].split(" ");
        simhw_syntax_behavior(s_expr[0]).operation(s_expr)
    }
}

function compute_general_behavior(name) {
    if (jit_behaviors) simhw_syntax_behavior(name).operation();
    else compute_behavior(name)
}

function compute_signal_behavior(signal_name, signal_value) {
    if (jit_behaviors) simhw_sim_signal(signal_name).behavior_fn[signal_value]();
    else compute_behavior(simhw_sim_signal(signal_name).behavior[signal_value])
}

function compile_verbals() {
    var jit_vbl = "";
    for (var sig in simhw_sim_signals()) {
        jit_vbl += "simhw_sim_signal('" + sig + "').verbal_fn = new Array();\n";
        for (var val in simhw_sim_signal(sig).behavior) {
            var input_behavior = simhw_sim_signal(sig).behavior[val];
            var jit_be = ' var r = ""; ';
            var s_exprs = input_behavior.split(";");
            for (var i = 0; i < s_exprs.length; i++) {
                s_exprs[i] = s_exprs[i].trim();
                if ("" == s_exprs[i]) continue;
                var s_expr = s_exprs[i].split(" ");
                jit_be += " r = r + simhw_syntax_behavior('" + s_expr[0] + "').verbal(" + JSON.stringify(s_expr) + ");\t"
            }
            jit_vbl += "simhw_sim_signal('" + sig + "').verbal_fn[" + val + "] = \t function() {" + jit_be + " return r; };\n"
        }
    }
    eval(jit_vbl);
    jit_verbals = true
}

function compute_verbal(input_behavior) {
    var verbal = "";
    var s_exprs = input_behavior.split(";");
    for (var i = 0; i < s_exprs.length; i++) {
        s_exprs[i] = s_exprs[i].trim();
        if ("" == s_exprs[i]) continue;
        var s_expr = s_exprs[i].split(" ");
        verbal = verbal + simhw_syntax_behavior(s_expr[0]).verbal(s_expr)
    }
    return verbal
}

function compute_signal_verbals(signal_name, signal_value) {
    var verbal = "";
    var sig_ref = null;
    sig_ref = simhw_sim_signal(signal_name);
    if (typeof sig_ref.behavior == "undefined") {
        return verbal
    }
    var index = sig_ref.behavior.length - 1;
    if (signal_value < index) {
        index = signal_value
    }
    if (typeof sig_ref.verbal != "undefined" && typeof sig_ref.verbal[index] != "undefined") {
        return sig_ref.verbal[index]
    }
    if (jit_behaviors) verbal = sig_ref.verbal_fn[index]();
    else verbal = compute_verbal(sig_ref.behavior[index]);
    return verbal
}

function simhwelto_prepare_hash(ahw) {
    ahw.elements_hash = {};
    ahw.elements_hash.by_belong = {};
    for (var e in ahw.elements) {
        elto = ahw.elements[e];
        elto.key = e;
        if (typeof ahw.elements_hash.by_belong[elto.belongs] == "undefined") {
            ahw.elements_hash.by_belong[elto.belongs] = []
        }
        ahw.elements_hash.by_belong[elto.belongs].push(elto)
    }
    return ahw.elements_hash
}

function simhwelto_show_components(ahw) {
    var o = "";
    var e = "";
    o += i18n_get_TagFor("hw", "Component").padEnd(10, " ") + ";" + i18n_get_TagFor("hw", "Element").padEnd(15, " ") + ";" + i18n_get_TagFor("hw", "States (In)").padEnd(20, " ") + ";" + i18n_get_TagFor("hw", "States (Out)").padEnd(20, " ") + ";" + i18n_get_TagFor("hw", "Signals").padEnd(10, " ") + "\n";
    for (var b in ahw.elements_hash.by_belong) {
        for (var j = 0; j < ahw.elements_hash.by_belong[b].length; j++) {
            elto = ahw.elements_hash.by_belong[b][j];
            o += b.padEnd(10, " ") + ";";
            o += elto.name.padEnd(15, " ") + ";";
            e = "";
            for (i = 0; i < elto.states_inputs.length; i++) {
                e += elto.states[elto.states_inputs[i]].ref + " "
            }
            o += e.padEnd(20, " ") + ";";
            e = "";
            for (i = 0; i < elto.states_outputs.length; i++) {
                e += elto.states[elto.states_outputs[i]].ref + " "
            }
            o += e.padEnd(20, " ") + ";";
            e = "";
            for (var es in elto.signals) {
                e += elto.signals[es].ref + " "
            }
            o += e.padEnd(10, " ") + "\n"
        }
    }
    return o
}

function simhwelto_describe_component_enum_aux(elto_path, array_eltos, hash_eltos, enum_name, str_enditem) {
    var o = "",
        k = "",
        v = "";
    for (var i = 0; i < array_eltos.length; i++) {
        k = elto_path + array_eltos[i];
        v = i18n_get_TagFor("hw", k.toUpperCase());
        v = "<span data-langkey='" + k.toUpperCase() + "'>" + v + "</span>";
        if ("Signals" != enum_name) o += "(" + (i + 1) + ") " + v;
        else o += "(" + (i + 1) + ") " + hash_eltos[array_eltos[i]].ref + ": " + v;
        if (i != array_eltos.length - 1) {
            o += str_enditem
        }
    }
    o += ". ";
    return o
}

function simhwelto_describe_component_enum(elto_path, array_eltos, hash_eltos, enum_name) {
    var o = "";
    o += "<span data-langkey='It has'>" + i18n_get_TagFor("hw", "It has") + "</span>" + " " + array_eltos.length + " " + "<span data-langkey='" + enum_name + "'>" + i18n_get_TagFor("hw", enum_name) + "</span>" + ": " + simhwelto_describe_component_enum_aux(elto_path, array_eltos, hash_eltos, enum_name, ", ");
    return o
}

function simhwelto_describe_component(elto_path, elto, format) {
    var o = "";
    o += elto.description + ".<br><ul>" + "<li>" + simhwelto_describe_component_enum(elto_path + ":states:", elto.states_inputs, elto.states, "inputs") + "<br>" + "<li>" + simhwelto_describe_component_enum(elto_path + ":states:", elto.states_outputs, elto.states, "outputs") + "<br>" + "<li>" + simhwelto_describe_component_enum(elto_path + ":signals:", elto.signals_inputs, elto.signals, "signals") + "<br>" + "</ul>";
    if (format != "html") {
        o.replace(/<[^>]*>?/gm, "")
    }
    return o
}
var ep_def = {
    sim_name: "Elemental Processor",
    sim_short_name: "ep",
    sim_img_processor: "examples/hardware/ep/images/processor.svg",
    sim_img_controlunit: "examples/hardware/ep/images/controlunit.svg",
    sim_img_cpu: "examples/hardware/ep/images/cpu.svg",
    components: {},
    states: {},
    signals: {},
    behaviors: {},
    elements: {},
    internal_states: {},
    ctrl_states: {},
    events: {}
};
simhw_add(ep_def);
sim.ep.behaviors.PRINT_S = {
    nparameters: 2,
    types: ["S"],
    operation: function(s_expr) {
        console.log(s_expr[1] + ": 0x" + sim.ep.signals[s_expr[1]].value.toString(16))
    },
    verbal: function(s_expr) {
        return "Print value of signal " + s_expr[1] + ": 0x" + sim.ep.signals[s_expr[1]].value.toString(16) + ". "
    }
};
sim.ep.behaviors.PRINT_E = {
    nparameters: 2,
    types: ["E"],
    operation: function(s_expr) {
        console.log(s_expr[1] + ": 0x" + sim.ep.states[s_expr[1]].value.toString(16))
    },
    verbal: function(s_expr) {
        return "Print value of state " + s_expr[1] + ": 0x" + sim.ep.states[s_expr[1]].value.toString(16) + ". "
    }
};
sim.ep.components["CPU"] = {
    name: "CPU",
    version: "1",
    abilities: ["CPU"],
    details_name: ["REGISTER_FILE", "CONTROL_MEMORY", "CLOCK", "CPU_STATS"],
    details_fire: [
        ["svg_p:text3029", "svg_p:text3031"],
        ["svg_cu:text3010"],
        ["svg_p:text3459-7", "svg_cu:text4138", "svg_cu:text4138-7"],
        ["svg_p:text3495"]
    ],
    write_state: function(vec) {
        if (typeof vec.CPU == "undefined") {
            vec.CPU = {}
        }
        var internal_reg = ["PC", "SR"];
        var value = 0;
        for (var i = 0; i < sim.ep.states.BR.length; i++) {
            value = parseInt(get_value(sim.ep.states.BR[i])) >>> 0;
            if (value != 0) {
                vec.CPU["R" + i] = {
                    type: "register",
                    default_value: 0,
                    id: "R" + i,
                    op: "=",
                    value: "0x" + value.toString(16)
                }
            }
        }
        for (i = 0; i < internal_reg.length; i++) {
            value = parseInt(get_value(sim.ep.states["REG_" + internal_reg[i]])) >>> 0;
            if (value != 0) {
                vec.CPU[internal_reg[i]] = {
                    type: "register",
                    default_value: 0,
                    id: internal_reg[i],
                    op: "=",
                    value: "0x" + value.toString(16)
                }
            }
        }
        return vec
    },
    read_state: function(vec, check) {
        if (typeof vec.CPU == "undefined") {
            vec.CPU = {}
        }
        var key = check["id"].toUpperCase().trim();
        var val = parseInt(check["value"]).toString(16);
        if ("REGISTER" == check["type"].toUpperCase().trim()) {
            vec.CPU[key] = {
                type: "register",
                default_value: 0,
                id: key,
                op: check["condition"],
                value: "0x" + val
            };
            return true
        }
        return false
    },
    get_state: function(reg) {
        var value = 0;
        var r_reg = reg.toUpperCase().trim();
        if (typeof sim.ep.states["REG_" + r_reg] != "undefined") {
            value = get_value(sim.ep.states["REG_" + r_reg]) >>> 0;
            return "0x" + value.toString(16)
        }
        r_reg = r_reg.replace("R", "");
        var index = parseInt(r_reg);
        if (typeof sim.ep.states.BR[index] != "undefined") {
            value = get_value(sim.ep.states.BR[index]) >>> 0;
            return "0x" + value.toString(16)
        }
        return null
    },
    get_value: function(elto) {
        if (Number.isInteger(elto)) index = elto;
        else index = parseInt(elto);
        if (isNaN(index)) return get_value(simhw_sim_state(elto)) >>> 0;
        return get_value(simhw_sim_states().BR[index]) >>> 0
    },
    set_value: function(elto, value) {
        var pc_name = simhw_sim_ctrlStates_get().pc.state;
        if (Number.isInteger(elto)) index = elto;
        else index = parseInt(elto);
        if (isNaN(index)) {
            set_value(simhw_sim_state(elto), value);
            if (pc_name === elto) {
                show_asmdbg_pc()
            }
            return value
        }
        return set_value(simhw_sim_states().BR[index], value)
    }
};
sim.ep.ctrl_states.pc = {
    name: "PC",
    state: "REG_PC",
    is_pointer: true
};
sim.ep.ctrl_states.sp = {
    name: "SP",
    state: "BR.29",
    is_pointer: true
};
sim.ep.ctrl_states.fp = {
    name: "FP",
    state: "BR.30",
    is_pointer: true
};
sim.ep.ctrl_states.ir = {
    name: "IR",
    state: "REG_IR",
    default_eltos: {
        co: {
            begin: 0,
            end: 5,
            length: 6
        },
        cop: {
            begin: 28,
            end: 31,
            length: 4
        }
    },
    is_pointer: false
};
sim.ep.ctrl_states.mpc = {
    name: "mPC",
    state: "REG_MICROADDR",
    is_pointer: false
};
sim.ep.internal_states.MC = {};
sim.ep.internal_states.ROM = {};
sim.ep.internal_states.FIRMWARE = ws_empty_firmware;
sim.ep.internal_states.io_hash = {};
sim.ep.internal_states.fire_stack = [];
sim.ep.internal_states.tri_state_names = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
sim.ep.internal_states.fire_visible = {
    databus: false,
    internalbus: false
};
sim.ep.internal_states.filter_states = ["REG_IR_DECO,col-12", "REG_IR,col-auto", "REG_PC,col-auto", "REG_MAR,col-auto", "REG_MBR,col-auto", "REG_RT1,col-auto", "REG_RT2,col-auto", "REG_RT3,col-auto", "REG_SR,col-auto", "REG_MICROADDR,col-auto"];
sim.ep.internal_states.filter_signals = ["A0,0", "B,0", "C,0", "SELA,5", "SELB,5", "SELC,2", "SELCOP,0", "MR,0", "MC,0", "C0,0", "C1,0", "C2,0", "C3,0", "C4,0", "C5,0", "C6,0", "C7,0", "T1,0", "T2,0", "T3,0", "T4,0", "T5,0", "T6,0", "T7,0", "T8,0", "T9,0", "T10,0", "T11,0", "M1,0", "M2,0", "M7,0", "MA,0", "MB,0", "SELP,0", "LC,0", "SE,0", "SIZE,0", "OFFSET,0", "BW,0", "R,0", "W,0", "TA,0", "TD,0", "IOR,0", "IOW,0", "TEST_I,0", "TEST_U,0"];
sim.ep.internal_states.alu_flags = {
    flag_n: 0,
    flag_z: 0,
    flag_v: 0,
    flag_c: 0
};
sim.ep.states.BR = [];
sim.ep.states.BR[0] = {
    name: "R0",
    verbal: "Register 0",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[1] = {
    name: "R1",
    verbal: "Register 1",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[2] = {
    name: "R2",
    verbal: "Register 2",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[3] = {
    name: "R3",
    verbal: "Register 3",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[4] = {
    name: "R4",
    verbal: "Register 4",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[5] = {
    name: "R5",
    verbal: "Register 5",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[6] = {
    name: "R6",
    verbal: "Register 6",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[7] = {
    name: "R7",
    verbal: "Register 7",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[8] = {
    name: "R8",
    verbal: "Register 8",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[9] = {
    name: "R9",
    verbal: "Register 9",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[10] = {
    name: "R10",
    verbal: "Register 10",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[11] = {
    name: "R11",
    verbal: "Register 11",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[12] = {
    name: "R12",
    verbal: "Register 12",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[13] = {
    name: "R13",
    verbal: "Register 13",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[14] = {
    name: "R14",
    verbal: "Register 14",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[15] = {
    name: "R15",
    verbal: "Register 15",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[16] = {
    name: "R16",
    verbal: "Register 16",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[17] = {
    name: "R17",
    verbal: "Register 17",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[18] = {
    name: "R18",
    verbal: "Register 18",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[19] = {
    name: "R19",
    verbal: "Register 19",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[20] = {
    name: "R20",
    verbal: "Register 20",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[21] = {
    name: "R21",
    verbal: "Register 21",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[22] = {
    name: "R22",
    verbal: "Register 22",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[23] = {
    name: "R23",
    verbal: "Register 23",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[24] = {
    name: "R24",
    verbal: "Register 24",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[25] = {
    name: "R25",
    verbal: "Register 25",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[26] = {
    name: "R26",
    verbal: "Register 26",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[27] = {
    name: "R27",
    verbal: "Register 27",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[28] = {
    name: "R28",
    verbal: "Register 28",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[29] = {
    name: "R29",
    verbal: "Register 29",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[30] = {
    name: "R30",
    verbal: "Register 30",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.BR[31] = {
    name: "R31",
    verbal: "Register 31",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_PC"] = {
    name: "PC",
    verbal: "Program Counter Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_MAR"] = {
    name: "MAR",
    verbal: "Memory Address Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_MBR"] = {
    name: "MBR",
    verbal: "Memory Data Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_IR"] = {
    name: "IR",
    verbal: "Instruction Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_RT1"] = {
    name: "RT1",
    verbal: "Temporal 1 Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_RT2"] = {
    name: "RT2",
    verbal: "Temporal 2 Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_RT3"] = {
    name: "RT3",
    verbal: "Temporal 3 Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_SR"] = {
    name: "SR",
    verbal: "State Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["BUS_IB"] = {
    name: "I_BUS",
    verbal: "Internal Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["BUS_AB"] = {
    name: "A_BUS",
    verbal: "Address Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["BUS_CB"] = {
    name: "C_BUS",
    verbal: "Control Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["BUS_DB"] = {
    name: "D_BUS",
    verbal: "Data Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["C2_T2"] = {
    name: "C2_T2",
    verbal: "Output of PC",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["RA_T9"] = {
    name: "RA_T9",
    verbal: "Input of T9 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["RB_T10"] = {
    name: "RB_T10",
    verbal: "Input of T10 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["HPC_T12"] = {
    name: "HPC_T12",
    verbal: "Input of T12 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["SELEC_T3"] = {
    name: "SELEC_T3",
    verbal: "Input of T3 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["SELP_M7"] = {
    name: "SELP_M7",
    verbal: "Output of MUX SelP",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["ALU_C6"] = {
    name: "ALU_C6",
    verbal: "Input of Temporal 3 Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["MA_ALU"] = {
    name: "MA_ALU",
    verbal: "Input ALU via MA",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["MB_ALU"] = {
    name: "MB_ALU",
    verbal: "Input ALU via MB",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["FLAG_C"] = {
    name: "FLAG_C",
    verbal: "Carry Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["FLAG_V"] = {
    name: "FLAG_V",
    verbal: "Overflow Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["FLAG_N"] = {
    name: "FLAG_N",
    verbal: "Negative Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["FLAG_Z"] = {
    name: "FLAG_Z",
    verbal: "Zero Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["FLAG_I"] = {
    name: "FLAG_I",
    verbal: "Interruption Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["FLAG_U"] = {
    name: "FLAG_U",
    verbal: "User Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["REG_MICROADDR"] = {
    name: "µADDR",
    verbal: "Microaddress Register",
    visible: true,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: ["svg_cu:text4667"]
};
sim.ep.states["REG_MICROINS"] = {
    name: "µINS",
    verbal: "Microinstruction Register",
    visible: true,
    nbits: "77",
    value: {},
    default_value: {},
    draw_data: []
};
sim.ep.states["FETCH"] = {
    name: "FETCH",
    verbal: "Input Fetch",
    visible: false,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["ROM_MUXA"] = {
    name: "ROM_MUXA",
    verbal: "Input ROM",
    visible: false,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["SUM_ONE"] = {
    name: "SUM_ONE",
    verbal: "Input next microinstruction",
    visible: false,
    nbits: "12",
    value: 1,
    default_value: 1,
    draw_data: []
};
sim.ep.states["MUXA_MICROADDR"] = {
    name: "MUXA_MICROADDR",
    verbal: "Input microaddress",
    visible: false,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["MUXC_MUXB"] = {
    name: "MUXC_MUXB",
    verbal: "Output of MUX C",
    visible: false,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["INEX"] = {
    name: "INEX",
    verbal: "Illegal Instruction Exception",
    visible: false,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["BS_M1"] = {
    name: "BS_M1",
    verbal: "from Memory",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["BS_TD"] = {
    name: "BS_TD",
    verbal: "Memory",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["INTV"] = {
    name: "INTV",
    verbal: "Interruption Vector",
    visible: false,
    nbits: "8",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["M2_C2"] = {
    name: "M2_C2",
    verbal: "Input of Program Counter",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["M1_C1"] = {
    name: "M1_C1",
    verbal: "Input of Memory Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["M7_C7"] = {
    name: "M7_C7",
    verbal: "Input of State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["VAL_ZERO"] = {
    name: "VAL_ZERO",
    verbal: "Wired Zero",
    visible: false,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["VAL_ONE"] = {
    name: "VAL_ONE",
    verbal: "Wired One",
    visible: false,
    nbits: "32",
    value: 1,
    default_value: 1,
    draw_data: []
};
sim.ep.states["VAL_FOUR"] = {
    name: "VAL_FOUR",
    verbal: "Wired Four",
    visible: false,
    nbits: "32",
    value: 4,
    default_value: 4,
    draw_data: []
};
sim.ep.states["REG_IR_DECO"] = {
    name: "IR_DECO",
    verbal: "Instruction Decoded",
    visible: true,
    nbits: "0",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["DECO_INS"] = {
    name: "DECO_INS",
    verbal: "Instruction decoded in binary",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["CLK"] = {
    name: "CLK",
    verbal: "Clock",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["ACC_TIME"] = {
    name: "ACC_TIME",
    verbal: "Accumulated CPU time",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["TTCPU"] = {
    name: "TTCPU",
    verbal: "Several Tristates to the internal data bus in CPU activated",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states["ACC_PWR"] = {
    name: "ACC_PWR",
    verbal: "Accumulated Energy Consumption",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.signals["C"] = {
    name: "C",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    behavior: ["MV MUXC_MUXB VAL_ZERO; FIRE B", "MBIT MUXC_MUXB INT 0 1; FIRE B", "MBIT MUXC_MUXB IORDY 0 1; FIRE B", "MBIT MUXC_MUXB MRDY 0 1; FIRE B", "MBIT MUXC_MUXB REG_SR 0 1; FIRE B", "MBIT MUXC_MUXB REG_SR 1 1; FIRE B", "MBIT MUXC_MUXB REG_SR 28 1; FIRE B", "MBIT MUXC_MUXB REG_SR 29 1; FIRE B", "MBIT MUXC_MUXB REG_SR 30 1; FIRE B", "MBIT MUXC_MUXB REG_SR 31 1; FIRE B", "MV MUXC_MUXB INEX; FIRE B"],
    fire_name: ["svg_cu:text3410"],
    draw_data: [
        ["svg_cu:path3108"],
        ["svg_cu:path3062"],
        ["svg_cu:path3060"],
        ["svg_cu:path3136"],
        ["svg_cu:path3482"],
        ["svg_cu:path3480"],
        ["svg_cu:path3488"],
        ["svg_cu:path3486"],
        ["svg_cu:path3484"],
        ["svg_cu:path3484-9"],
        ["svg_cu:path3108-3", "svg_cu:path3260-3-8-6", "svg_cu:path3260-3-8", "svg_cu:path3260-3"]
    ],
    draw_name: [
        ["svg_cu:path3496", "svg_cu:path3414", "svg_cu:path3194-08"]
    ]
};
sim.ep.signals["B"] = {
    name: "B",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV A1 MUXC_MUXB; FIRE A1", "NOT_ES A1 MUXC_MUXB; FIRE A1"],
    depends_on: ["CLK"],
    fire_name: ["svg_cu:text3408"],
    draw_data: [
        ["svg_cu:path3100-8-7", "svg_cu:path3108-1"],
        ["svg_cu:path3392", "svg_cu:path3372", "svg_cu:path3390", "svg_cu:path3384", "svg_cu:path3100-8-7"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3194-0", "svg_cu:path3138-8", "svg_cu:path3498-6"]
    ]
};
sim.ep.signals["A0"] = {
    name: "A0",
    visible: false,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["SBIT_SIGNAL A0A1 0 1; FIRE A0A1", "SBIT_SIGNAL A0A1 1 1; FIRE A0A1"],
    depends_on: ["CLK"],
    fire_name: ["svg_cu:text3406"],
    draw_data: [
        ["svg_cu:path3096"],
        ["svg_cu:path3096"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3138-8-1", "svg_cu:path3098-2", "svg_cu:path3124-2-5"]
    ]
};
sim.ep.signals["A1"] = {
    name: "A1",
    visible: false,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["SBIT_SIGNAL A0A1 0 0; FIRE A0A1", "SBIT_SIGNAL A0A1 1 0; FIRE A0A1"],
    depends_on: ["CLK"],
    fire_name: [],
    draw_data: [
        ["svg_cu:path3094"],
        ["svg_cu:path3094"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["A0A1"] = {
    name: "A0A1",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["PLUS1 MUXA_MICROADDR REG_MICROADDR", "CP_FIELD MUXA_MICROADDR REG_MICROINS/MADDR", "MV MUXA_MICROADDR ROM_MUXA", "MV MUXA_MICROADDR FETCH"],
    depends_on: ["CLK"],
    fire_name: [],
    draw_data: [
        ["svg_cu:path3102", "svg_cu:path3100", "svg_cu:path3098", "svg_cu:path3100-9", "svg_cu:path3088"],
        ["svg_cu:path3104", "svg_cu:path3134", "svg_cu:path3500", "svg_cu:path3416"],
        ["svg_cu:path3504", "svg_cu:path3100-8", "svg_cu:path3234-9"],
        ["svg_cu:path3124"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["C0"] = {
    name: "C0",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_MAR BUS_IB"],
    fire_name: ["svg_p:text3077"],
    draw_data: [
        ["svg_p:path3081"]
    ],
    draw_name: [
        ["svg_p:path3075"]
    ]
};
sim.ep.signals["C1"] = {
    name: "C1",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_MBR M1_C1"],
    fire_name: ["svg_p:text3079"],
    draw_data: [
        ["svg_p:path3055"]
    ],
    draw_name: [
        ["svg_p:path3073"]
    ]
};
sim.ep.signals["C2"] = {
    name: "C2",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_PC M2_C2; UPDATEDPC"],
    fire_name: ["svg_p:text3179"],
    draw_data: [
        ["svg_p:path3485"]
    ],
    draw_name: [
        ["svg_p:path3177"]
    ]
};
sim.ep.signals["C3"] = {
    name: "C3",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_IR BUS_IB; DECO; FIRE_IFSET C 10"],
    fire_name: ["svg_p:text3439"],
    draw_data: [
        ["svg_p:path3339"]
    ],
    draw_name: [
        ["svg_p:path3337"]
    ]
};
sim.ep.signals["C4"] = {
    name: "C4",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_RT1 BUS_IB"],
    fire_name: ["svg_p:text3441"],
    draw_data: [
        ["svg_p:path3263"]
    ],
    draw_name: [
        ["svg_p:path3255"]
    ]
};
sim.ep.signals["C5"] = {
    name: "C5",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_RT2 BUS_IB"],
    fire_name: ["svg_p:text3443"],
    draw_data: [
        ["svg_p:path3277"]
    ],
    draw_name: [
        ["svg_p:path3269"]
    ]
};
sim.ep.signals["C6"] = {
    name: "C6",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_RT3 ALU_C6"],
    fire_name: ["svg_p:text3445"],
    draw_data: [
        ["svg_p:path3325", "svg_p:path3323"]
    ],
    draw_name: [
        ["svg_p:path3245"]
    ]
};
sim.ep.signals["C7"] = {
    name: "C7",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LOAD REG_SR M7_C7"],
    fire_name: ["svg_p:text3655"],
    draw_data: [
        ["svg_p:path3651-9"]
    ],
    draw_name: [
        ["svg_p:path3681"]
    ]
};
sim.ep.signals["TA"] = {
    name: "TA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV BUS_AB REG_MAR; MOVE_BITSE A1A0 0 2 BUS_AB 0; FIRE_IFCHANGED A1A0 A1A0"],
    fire_name: ["svg_p:text3091"],
    draw_data: [
        ["svg_p:path3089", "svg_p:path3597", "svg_p:path3513", "svg_p:path3601", "svg_p:path3601-2", "svg_p:path3187", "svg_p:path3087", "svg_p:path2995", "svg_p:path3535"]
    ],
    draw_name: [
        ["svg_p:path3085"]
    ]
};
sim.ep.signals["TD"] = {
    name: "TD",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; CHECK_RTD", "MV BUS_DB BS_TD; MOVE_BITSE A1A0 0 2 BUS_AB 0; FIRE_IFCHANGED A1A0 A1A0; CHECK_RTD"],
    fire_name: ["svg_p:text3103"],
    draw_data: [
        ["svg_p:path3101", "svg_p:path3587", "svg_p:path3515", "svg_p:path3071", "svg_p:path3419", "svg_p:path3099", "svg_p:path3097", "svg_p:path3559-5", "svg_p:path3419-1-0", "svg_p:path3583", "svg_p:path3419-1", "svg_p:path3491", "svg_p:path3641", "svg_p:path3541"]
    ],
    draw_name: [
        ["svg_p:path3095"]
    ]
};
sim.ep.signals["T1"] = {
    name: "T1",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 0", "MV BUS_IB REG_MBR; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 0"],
    fire_name: ["svg_p:text3105"],
    draw_data: [
        ["svg_p:path3071", "svg_p:path3049", "svg_p:path3063-9", "svg_p:path3071", "svg_p:path3071", "svg_p:path3069"]
    ],
    draw_name: [
        ["svg_p:path3067"]
    ]
};
sim.ep.signals["T2"] = {
    name: "T2",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 1", "MV BUS_IB REG_PC; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 1"],
    fire_name: ["svg_p:text3449"],
    draw_data: [
        ["svg_p:path3199", "svg_p:path3201", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3329"]
    ]
};
sim.ep.signals["T3"] = {
    name: "T3",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 2", "MV BUS_IB SELEC_T3; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 2"],
    fire_name: ["svg_p:text3451"],
    draw_data: [
        ["svg_p:path3349", "svg_p:path3931", "svg_p:path3345", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3351"]
    ]
};
sim.ep.signals["T4"] = {
    name: "T4",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 3", "MV BUS_IB REG_RT1; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 3"],
    fire_name: ["svg_p:text3453"],
    draw_data: [
        ["svg_p:path3261", "svg_p:path3259", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3305"]
    ]
};
sim.ep.signals["T5"] = {
    name: "T5",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 4", "MV BUS_IB REG_RT2; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 4"],
    fire_name: ["svg_p:text3455"],
    draw_data: [
        ["svg_p:path3275", "svg_p:path3273", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3307"]
    ]
};
sim.ep.signals["T6"] = {
    name: "T6",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 5", "MV BUS_IB ALU_C6; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 5"],
    fire_name: ["svg_p:text3457"],
    draw_data: [
        ["svg_p:path3589", "svg_p:path3317", "svg_p:path3163-2", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3319"]
    ]
};
sim.ep.signals["T7"] = {
    name: "T7",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 6", "MV BUS_IB REG_RT3; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 6"],
    fire_name: ["svg_p:text3459"],
    draw_data: [
        ["svg_p:path3327", "svg_p:path3311", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3313"]
    ]
};
sim.ep.signals["T8"] = {
    name: "T8",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 7", "MV BUS_IB REG_SR; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 7"],
    fire_name: ["svg_p:text3657"],
    draw_data: [
        ["svg_p:path3651", "svg_p:path3647", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3649"]
    ]
};
sim.ep.signals["T9"] = {
    name: "T9",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 8", "MV BUS_IB RA_T9; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 8"],
    fire_name: ["svg_p:text3147"],
    draw_data: [
        ["svg_p:path3143", "svg_p:path3139", "svg_p:path3049", "svg_p:path3143-9"]
    ],
    draw_name: [
        ["svg_p:path3133"]
    ]
};
sim.ep.signals["T10"] = {
    name: "T10",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 9", "MV BUS_IB RB_T10; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 9"],
    fire_name: ["svg_p:text3149"],
    draw_data: [
        ["svg_p:path3145", "svg_p:path3141", "svg_p:path3049", "svg_p:path3145-5"]
    ],
    draw_name: [
        ["svg_p:path3137"]
    ]
};
sim.ep.signals["T11"] = {
    name: "T11",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 10", "CP_FIELD BUS_IB REG_MICROINS/EXCODE; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 10"],
    fire_name: ["svg_p:text3147-5", "svg_cu:tspan4426"],
    draw_data: [
        ["svg_p:path3145", "svg_p:path3081-3", "svg_p:path3139-7", "svg_p:path3049", "svg_cu:path3081-3", "svg_cu:path3139-7"]
    ],
    draw_name: [
        ["svg_p:path3133-6", "svg_cu:path3133-6"]
    ]
};
sim.ep.signals["T12"] = {
    name: "T12",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 11", "MV BUS_IB HPC_T12; FIRE M7; FIRE M2; FIRE M1; SET_TT TTCPU 11"],
    fire_name: ["svg_p:text3147-5-0-1-1"],
    draw_data: [
        ["svg_p:path3139-7-1-4-3", "svg_cu:path3049"]
    ],
    draw_name: [
        ["svg_cu:path3133-6-9-7-5"]
    ]
};
sim.ep.signals["M1"] = {
    name: "M1",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV M1_C1 BUS_IB", "MV M1_C1 BS_M1"],
    depends_on: ["C1"],
    fire_name: ["svg_p:text3469"],
    draw_data: [
        ["svg_p:path3063", "svg_p:path3061", "svg_p:path3059"],
        ["svg_p:path3057", "svg_p:path3641", "svg_p:path3419", "svg_p:path3583"]
    ],
    draw_name: [
        [],
        ["svg_p:path3447"]
    ]
};
sim.ep.signals["M2"] = {
    name: "M2",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV M2_C2 BUS_IB", "PLUS4 M2_C2 REG_PC"],
    depends_on: ["C2"],
    fire_name: ["svg_p:text3471"],
    draw_data: [
        ["svg_p:path3217", "svg_p:path3215", "svg_p:path3213", "svg_p:path3213-9"],
        ["svg_p:path3211", "svg_p:path3209", "svg_p:path3193", "svg_p:path3207", "svg_p:path3197", "svg_p:path3201"]
    ],
    draw_name: [
        [],
        ["svg_p:path3467", "svg_p:path3467"]
    ]
};
sim.ep.signals["M7"] = {
    name: "M7",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV M7_C7 BUS_IB", "MV M7_C7 SELP_M7"],
    depends_on: ["C7"],
    fire_name: ["svg_p:text3673"],
    draw_data: [
        ["svg_p:path3691", "svg_p:path3693", "svg_p:path3659"],
        ["svg_p:path3695"]
    ],
    draw_name: [
        [],
        ["svg_p:path3667"]
    ]
};
sim.ep.signals["MA"] = {
    name: "MA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV MA_ALU RA_T9; FIRE COP", "MV MA_ALU REG_RT1; FIRE COP"],
    depends_on: ["SELA", "SELB"],
    fire_name: ["svg_p:text3463"],
    draw_data: [
        ["svg_p:path3249", "svg_p:path3161", "svg_p:path3165"],
        ["svg_p:path3279"]
    ],
    draw_name: [
        [],
        ["svg_p:path3423"]
    ]
};
sim.ep.signals["MB"] = {
    name: "MB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["MV MB_ALU RB_T10; FIRE COP", "MV MB_ALU REG_RT2; FIRE COP", "MV MB_ALU VAL_FOUR; FIRE COP", "MV MB_ALU VAL_ONE; FIRE COP"],
    depends_on: ["SELA", "SELB"],
    fire_name: ["svg_p:text3465"],
    draw_data: [
        ["svg_p:path3281", "svg_p:path3171", "svg_p:path3169"],
        ["svg_p:path3283"],
        ["svg_p:path3295", "svg_p:path3293"],
        ["svg_p:path3297", "svg_p:path3299"]
    ],
    draw_name: [
        [],
        ["svg_p:path3425", "svg_p:path3427"]
    ]
};
sim.ep.signals["MH"] = {
    name: "MH",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["MV HPC_T12 CLK", "MV HPC_T12 ACC_TIME", "MV HPC_T12 ACC_PWR", "NOP"],
    fire_name: ["svg_p:text3147-5-0-1-8-4"],
    draw_data: [
        [],
        ["svg_p:path3081-3-8-5-3"]
    ],
    draw_name: [
        [],
        ["svg_p:path3306-8-7-6"]
    ]
};
sim.ep.signals["COP"] = {
    name: "COP",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    forbidden: true,
    behavior: ["NOP_ALU; UPDATE_NZVC", "AND ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "OR ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "NOT ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "XOR ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "SRL ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "SRA ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "SL ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "RR ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "RL ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "ADD ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "SUB ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "MUL ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "DIV ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "MOD ALU_C6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3", "LUI ALU_C6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET SELP 3"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_p:text3303"],
    draw_data: [
        ["svg_p:path3237", "svg_p:path3239", "svg_p:path3261-8", "svg_p:path3321", "svg_p:path3901-6", "svg_p:path3317-9"]
    ],
    draw_name: [
        ["svg_p:path3009", "svg_p:path3301"]
    ]
};
sim.ep.signals["SELP"] = {
    name: "SELP",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["NOP", "MV SELP_M7 REG_SR; UPDATE_FLAG SELP_M7 FLAG_U 0; FIRE M7", "MV SELP_M7 REG_SR; UPDATE_FLAG SELP_M7 FLAG_I 1; FIRE M7", "MV SELP_M7 REG_SR; UPDATE_FLAG SELP_M7 FLAG_C 31; UPDATE_FLAG SELP_M7 FLAG_V 30; UPDATE_FLAG SELP_M7 FLAG_N 29; UPDATE_FLAG SELP_M7 FLAG_Z 28; FIRE M7"],
    fire_name: ["svg_p:text3703"],
    draw_data: [
        [],
        ["svg_p:path3643"],
        ["svg_p:path3705"],
        ["svg_p:path3675", "svg_p:path3331"]
    ],
    draw_name: [
        [],
        ["svg_p:path3697"]
    ]
};
sim.ep.signals["SELA"] = {
    name: "SELA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["FIRE MR_RA"],
    depends_on: ["RA"],
    fire_name: ["svg_cu:text3164"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["SELB"] = {
    name: "SELB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["FIRE MR_RB"],
    depends_on: ["RB"],
    fire_name: ["svg_cu:text3168"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["SELC"] = {
    name: "SELC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["FIRE MR_RC"],
    depends_on: ["RC"],
    fire_name: ["svg_cu:text3172"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["SELCOP"] = {
    name: "SELCOP",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    behavior: ["FIRE MC"],
    depends_on: ["COP"],
    fire_name: ["svg_cu:text3312"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["EXCODE"] = {
    name: "EXCODE",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    behavior: ["FIRE T11"],
    fire_name: ["svg_cu:text3312-6"],
    draw_data: [
        []
    ],
    draw_name: []
};
sim.ep.signals["RA"] = {
    name: "RA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    forbidden: true,
    behavior: ["GET RA_T9 BR RA; FIRE_IFSET T9 1; FIRE_IFSET MA 0"],
    depends_on: ["SELA"],
    fire_name: ["svg_p:text3107"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3109"]
    ]
};
sim.ep.signals["RB"] = {
    name: "RB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    forbidden: true,
    behavior: ["GET RB_T10 BR RB; FIRE_IFSET T10 1; FIRE_IFSET MB 0"],
    depends_on: ["SELB"],
    fire_name: ["svg_p:text3123"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3113"]
    ]
};
sim.ep.signals["RC"] = {
    name: "RC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    forbidden: true,
    behavior: ["FIRE LC"],
    depends_on: ["SELC"],
    fire_name: ["svg_p:text3125"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3117"]
    ]
};
sim.ep.signals["LC"] = {
    name: "LC",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "SET BR RC BUS_IB"],
    fire_name: ["svg_p:text3127"],
    draw_data: [
        ["svg_p:path3153", "svg_p:path3151", "svg_p:path3129"]
    ],
    draw_name: [
        ["svg_p:path3121"]
    ]
};
sim.ep.signals["SE"] = {
    name: "SE",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3; MOVE_BITS SBWA 4 1 SE; FIRE_IFCHANGED SBWA SE", "MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3; MOVE_BITS SBWA 4 1 SE; FIRE_IFCHANGED SBWA SE"],
    depends_on: ["T3"],
    fire_name: ["svg_p:text3593", "svg_p:text3431"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3591", "svg_p:path3447-7-7"]
    ]
};
sim.ep.signals["SIZE"] = {
    name: "SIZE",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3"],
    depends_on: ["T3"],
    fire_name: ["svg_p:text3363"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3355"]
    ]
};
sim.ep.signals["OFFSET"] = {
    name: "OFFSET",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3"],
    depends_on: ["T3"],
    fire_name: ["svg_p:text3707"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3359"]
    ]
};
sim.ep.signals["MC"] = {
    name: "MC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT COP REG_IR 0 4; FIRE COP;", "CP_FIELD COP REG_MICROINS/SELCOP; FIRE COP;"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_cu:text3322", "svg_cu:text3172-1-5"],
    draw_data: [
        ["svg_cu:path3320", "svg_cu:path3142"],
        ["svg_cu:path3318", "svg_cu:path3502-6"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3306"]
    ]
};
sim.ep.signals["MR"] = {
    name: "MR",
    verbal: ["Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. ", "Copy SelA, SelB, and SelB into RA, RB, and RC. "],
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV MR_RA MR; FIRE MR_RA; MV MR_RB MR; FIRE MR_RB; MV MR_RC MR; FIRE MR_RC;", "MV MR_RA MR; FIRE MR_RA; MV MR_RB MR; FIRE MR_RB; MV MR_RC MR; FIRE MR_RC;"],
    depends_on: ["SELA", "SELB", "SELC"],
    fire_name: ["svg_cu:text3222", "svg_cu:text3242", "svg_cu:text3254", "svg_cu:text3172-1"],
    draw_data: [
        ["svg_cu:path3494", "svg_cu:path3492", "svg_cu:path3490", "svg_cu:path3188", "svg_cu:path3190", "svg_cu:path3192", "svg_cu:path3194", "svg_cu:path3276", "svg_cu:path3290", "svg_cu:path3260", "svg_cu:path3196", "svg_cu:path3278", "svg_cu:path3292"],
        ["svg_cu:path3270", "svg_cu:path3282", "svg_cu:path3300", "svg_cu:path3258", "svg_cu:path3260", "svg_cu:path3258-4", "svg_cu:path3278", "svg_cu:path3196", "svg_cu:path3294", "svg_cu:path3292", "svg_cu:path3288", "svg_cu:path3280"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3220", "svg_cu:path3240", "svg_cu:path3252"]
    ]
};
sim.ep.signals["MR_RA"] = {
    name: "MR_RA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT_SN RA REG_IR REG_MICROINS/SELA 5; FIRE RA;", "CP_FIELD RA REG_MICROINS/SELA; FIRE RA;"],
    fire_name: [],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["MR_RB"] = {
    name: "MR_RB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT_SN RB REG_IR REG_MICROINS/SELB 5; FIRE RB;", "CP_FIELD RB REG_MICROINS/SELB; FIRE RB;"],
    fire_name: [],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["MR_RC"] = {
    name: "MR_RC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT_SN RC REG_IR REG_MICROINS/SELC 5; FIRE RC;", "CP_FIELD RC REG_MICROINS/SELC; FIRE RC;"],
    fire_name: [],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["BW"] = {
    name: "BW",
    verbal: ["Select one byte (based on A1A0) from Word. ", "Select two bytes (one Half Word based on A1A0) from Word. ", "", "Select the full Word. "],
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW", "MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW", "MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW", "MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW"],
    fire_name: ["svg_p:text3433"],
    draw_data: [
        ["svg_p:path3061-2-6", "svg_p:path3101-8", "svg_p:path3535-8"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["A1A0"] = {
    name: "A1A0",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA", "MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA", "MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA", "MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA"],
    fire_name: ["svg_p:text3603"],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["BWA"] = {
    name: "BWA",
    visible: false,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    behavior: ["BSEL BS_TD 0 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 8 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 16 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 24 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W", "MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W", "MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W", "MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W", "MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W"],
    fire_name: ["svg_p:text3533-5"],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["SBWA"] = {
    name: "SBWA",
    visible: false,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["BSEL BS_M1 0 8 BUS_DB 0; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 8; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 16; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 24; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 0; EXT_SIG BS_M1 7; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 8; EXT_SIG BS_M1 7; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 16; EXT_SIG BS_M1 7; FIRE M1", "BSEL BS_M1 0 8 BUS_DB 24; EXT_SIG BS_M1 7; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1", "BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1", "MV BS_M1 BUS_DB; FIRE M1"],
    fire_name: [],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["IOR"] = {
    name: "IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MOVE_BITS KBD_IOR 0 1 IOR; MOVE_BITS SCR_IOR 0 1 IOR; MOVE_BITS L3D_IOR 0 1 IOR; MOVE_BITS L3D_IOR 0 1 IOR; FIRE KBD_IOR; FIRE SCR_IOR; FIRE L3D_IOR; FIRE LEDM_IOR"],
    fire_name: ["svg_p:text3715"],
    draw_data: [
        [],
        ["svg_p:path3733", "svg_p:path3491", "svg_p:text3715"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["IOW"] = {
    name: "IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MOVE_BITS SCR_IOW 0 1 IOW; FIRE SCR_IOW; MOVE_BITS IO_IOW 0 1 IOW; FIRE IO_IOW; MOVE_BITS L3D_IOW 0 1 IOW; FIRE L3D_IOW; MOVE_BITS LEDM_IOW 0 1 IOW; FIRE LEDM_IOW"],
    fire_name: ["svg_p:text3717"],
    draw_data: [
        [],
        ["svg_p:path3735", "svg_p:path3491", "svg_p:text3717"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["I"] = {
    name: "I",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV FLAG_I VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_I VAL_ONE; FIRE_IFSET SELP 2"],
    fire_name: [],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["U"] = {
    name: "U",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV FLAG_U VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_U VAL_ONE; FIRE_IFSET SELP 2"],
    fire_name: [],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals["TEST_C"] = {
    name: "TEST_C",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_C VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_C VAL_ONE; FIRE_IFSET SELP 3"],
    depends_on: ["SELCOP", "COP"],
    fire_name: ["svg_p:text3701-3"],
    draw_data: [
        ["svg_p:text3701-3"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["TEST_V"] = {
    name: "TEST_V",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_V VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_V VAL_ONE; FIRE_IFSET SELP 3"],
    depends_on: ["SELCOP", "COP"],
    fire_name: ["svg_p:text3701-3-1"],
    draw_data: [
        ["svg_p:text3701-3-1"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["TEST_N"] = {
    name: "TEST_N",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_N VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_N VAL_ONE; FIRE_IFSET SELP 3"],
    depends_on: ["SELCOP", "COP"],
    fire_name: ["svg_p:text3701-3-2"],
    draw_data: [
        ["svg_p:text3701-3-2"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["TEST_Z"] = {
    name: "TEST_Z",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_Z VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_Z VAL_ONE; FIRE_IFSET SELP 3"],
    depends_on: ["SELCOP", "COP"],
    fire_name: ["svg_p:text3701-3-5"],
    draw_data: [
        ["svg_p:text3701-3-5"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["TEST_I"] = {
    name: "TEST_I",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV FLAG_I VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_I VAL_ONE; FIRE_IFSET SELP 2"],
    depends_on: ["CLK"],
    fire_name: ["svg_p:text3669"],
    draw_data: [
        ["svg_p:text3669"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["TEST_U"] = {
    name: "TEST_U",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV FLAG_U VAL_ZERO; FIRE_IFSET SELP 1", "MV FLAG_U VAL_ONE; FIRE_IFSET SELP 1"],
    depends_on: ["CLK"],
    fire_name: ["svg_p:text3669-1"],
    draw_data: [
        ["svg_p:text3669-1"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.signals["TEST_INTV"] = {
    name: "TEST_INTV",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "8",
    forbidden: true,
    behavior: ["MBIT INTV TEST_INTV 0 32"],
    depends_on: ["INT"],
    fire_name: ["svg_p:tspan4225"],
    draw_data: [
        ["svg_p:path3749"]
    ],
    draw_name: [
        []
    ]
};
sim.ep.behaviors["NOP"] = {
    nparameters: 1,
    operation: function(s_expr) {},
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["NOP_ALU"] = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.internal_states.alu_flags.flag_n = 0;
        sim.ep.internal_states.alu_flags.flag_z = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0;
        sim.ep.internal_states.alu_flags.flag_v = 0
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["MV"] = {
    nparameters: 3,
    types: ["X", "X"],
    operation: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        newval = get_value(sim_elto_org);
        set_value(sim_elto_dst, newval)
    },
    verbal: function(s_expr) {
        var sim_elto_org = get_reference(s_expr[2]);
        var newval = get_value(sim_elto_org);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(newval) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " (" + show_value(newval) + "). "
    }
};
sim.ep.behaviors["LOAD"] = {
    nparameters: 3,
    types: ["X", "X"],
    operation: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        newval = get_value(sim_elto_org);
        set_value(sim_elto_dst, newval)
    },
    verbal: function(s_expr) {
        var sim_elto_org = get_reference(s_expr[2]);
        var newval = get_value(sim_elto_org);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Load from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(newval) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " (" + show_value(newval) + "). "
    }
};
sim.ep.behaviors["CP_FIELD"] = {
    nparameters: 3,
    types: ["X", "X"],
    operation: function(s_expr) {
        r = s_expr[2].split("/");
        sim_elto_org = get_reference(r[0]);
        newval = get_value(sim_elto_org);
        newval = newval[r[1]];
        if (typeof newval != "undefined") {
            sim_elto_dst = get_reference(s_expr[1]);
            set_value(sim_elto_dst, newval)
        }
    },
    verbal: function(s_expr) {
        var r = s_expr[2].split("/");
        var sim_elto_org = get_reference(r[0]);
        var newval = 0;
        var r = s_expr[2].split("/");
        var sim_elto_org = get_reference(r[0]);
        var sim_elto_dst = get_reference(r[1]);
        if (typeof sim_elto_dst == "undefined") sim_elto_dst = {};
        if (typeof sim_elto_org.value[r[1]] != "undefined") newval = sim_elto_org.value[r[1]];
        else if (typeof sim_elto_dst.default_value != "undefined") newval = sim_elto_dst.default_value;
        else newval = "&lt;undefined&gt;";
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from Field " + r[1] + " of " + show_verbal(r[0]) + " to " + show_verbal(s_expr[1]) + " value " + newval + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(r[0]) + "." + r[1] + " (" + newval + "). "
    }
};
sim.ep.behaviors["NOT_ES"] = {
    nparameters: 3,
    types: ["S", "E"],
    operation: function(s_expr) {
        set_value(sim.ep.signals[s_expr[1]], Math.abs(get_value(sim.ep.states[s_expr[2]]) - 1))
    },
    verbal: function(s_expr) {
        var value = Math.abs(get_value(sim.ep.states[s_expr[2]]) - 1);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Logical NOT of " + s_expr[2] + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_value(value) + " (Logical NOT " + s_expr[2] + "). "
    }
};
sim.ep.behaviors["GET"] = {
    nparameters: 4,
    types: ["E", "E", "S"],
    operation: function(s_expr) {
        set_value(sim.ep.states[s_expr[1]], get_value(sim.ep.states[s_expr[2]][sim.ep.signals[s_expr[3]].value]))
    },
    verbal: function(s_expr) {
        var value = get_value(sim.ep.states[s_expr[2]][sim.ep.signals[s_expr[3]].value]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Register File " + s_expr[3] + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_value(value) + " (Register File " + s_expr[3] + "). "
    }
};
sim.ep.behaviors["SET"] = {
    nparameters: 4,
    types: ["E", "S", "E"],
    operation: function(s_expr) {
        set_value(sim.ep.states[s_expr[1]][sim.ep.signals[s_expr[2]].value], get_value(sim.ep.states[s_expr[3]]))
    },
    verbal: function(s_expr) {
        var value = get_value(sim.ep.states[s_expr[3]]);
        var o_ref = sim.ep.states[s_expr[1]][sim.ep.signals[s_expr[2]].value];
        var o_verbal = o_ref.name;
        if (typeof o_ref.verbal != "undefined") o_verbal = o_ref.verbal;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy to " + o_verbal + " the value " + show_value(value) + ". "
        }
        return o_verbal + " = " + show_value(value) + ". "
    }
};
sim.ep.behaviors["AND"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) & get_value(sim.ep.states[s_expr[3]]);
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) & get_value(sim.ep.states[s_expr[3]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU AND with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (AND). "
    }
};
sim.ep.behaviors["OR"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) | get_value(sim.ep.states[s_expr[3]]);
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) | get_value(sim.ep.states[s_expr[3]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU OR with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (OR). "
    }
};
sim.ep.behaviors["NOT"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = ~get_value(sim.ep.states[s_expr[2]]);
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = ~get_value(sim.ep.states[s_expr[2]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU NOT with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (NOT). "
    }
};
sim.ep.behaviors["XOR"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) ^ get_value(sim.ep.states[s_expr[3]]);
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) ^ get_value(sim.ep.states[s_expr[3]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU XOR with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (XOR). "
    }
};
sim.ep.behaviors["SRL"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) >>> 1;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) >>> 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Shift Right Logical with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SRL). "
    }
};
sim.ep.behaviors["SRA"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) >> 1;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) >> 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Shift Right Arithmetic with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SRA). "
    }
};
sim.ep.behaviors["SL"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) << 1;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = result >>> 31
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) << 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Shift Left with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SL). "
    }
};
sim.ep.behaviors["RR"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) >>> 1 | (get_value(sim.ep.states[s_expr[2]]) & 1) << 31;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) >>> 1 | (get_value(sim.ep.states[s_expr[2]]) & 1) << 31;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Right Rotation with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (RR). "
    }
};
sim.ep.behaviors["RL"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) << 1 | (get_value(sim.ep.states[s_expr[2]]) & 2147483648) >>> 31;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) << 1 | (get_value(sim.ep.states[s_expr[2]]) & 2147483648) >>> 31;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Left Rotation with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (LR). "
    }
};
sim.ep.behaviors["ADD"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        var result = a + b;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.ep.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.ep.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        var result = a + b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU ADD with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (ADD). "
    }
};
sim.ep.behaviors["SUB"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        var result = a - b;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.ep.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.ep.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        var result = a - b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU SUB with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SUB). "
    }
};
sim.ep.behaviors["MUL"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        var result = a * b;
        set_value(sim.ep.states[s_expr[1]], result >>> 0);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_c = 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.ep.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.ep.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        var result = a * b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU MUL with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (MUL). "
    }
};
sim.ep.behaviors["DIV"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        if (0 == b) {
            set_value(sim.ep.states[s_expr[1]], 0);
            sim.ep.internal_states.alu_flags.flag_n = 0;
            sim.ep.internal_states.alu_flags.flag_z = 1;
            sim.ep.internal_states.alu_flags.flag_v = 1;
            sim.ep.internal_states.alu_flags.flag_c = 0;
            return
        }
        var result = Math.floor(a / b);
        set_value(sim.ep.states[s_expr[1]], result);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        if (0 == b) {
            return "ALU DIV zero by zero (oops!). "
        }
        var result = Math.floor(a / b);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU DIV with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (DIV). "
    }
};
sim.ep.behaviors["MOD"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        if (0 == b) {
            set_value(sim.ep.states[s_expr[1]], 0);
            sim.ep.internal_states.alu_flags.flag_n = 0;
            sim.ep.internal_states.alu_flags.flag_z = 1;
            sim.ep.internal_states.alu_flags.flag_v = 1;
            sim.ep.internal_states.alu_flags.flag_c = 0;
            return
        }
        var result = a % b;
        set_value(sim.ep.states[s_expr[1]], result);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var b = get_value(sim.ep.states[s_expr[3]]) << 0;
        if (0 == b) {
            return "ALU MOD zero by zero (oops!). "
        }
        var result = a % b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU MOD with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (MOD). "
    }
};
sim.ep.behaviors["LUI"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) << 16;
        set_value(sim.ep.states[s_expr[1]], result);
        sim.ep.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.ep.internal_states.alu_flags.flag_v = 0;
        sim.ep.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.ep.states[s_expr[2]]) << 16;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Load Upper Immediate with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (LUI). "
    }
};
sim.ep.behaviors["PLUS1"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var result = a + 1;
        set_value(sim.ep.states[s_expr[1]], result >>> 0)
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var result = a + 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy to " + show_verbal(s_expr[1]) + " " + show_verbal(s_expr[2]) + " plus one with result " + show_value(result) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " + 1" + " (" + show_value(result) + "). "
    }
};
sim.ep.behaviors["PLUS4"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var result = a + 4;
        set_value(sim.ep.states[s_expr[1]], result >>> 0)
    },
    verbal: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[2]]) << 0;
        var result = a + 4;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy to " + show_verbal(s_expr[1]) + " " + show_verbal(s_expr[2]) + " plus four with result " + show_value(result) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " + 4" + " (" + show_value(result) + "). "
    }
};
sim.ep.behaviors["SET_TT"] = {
    nparameters: 3,
    types: ["E", "I"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[1]]) << 0;
        var b = parseInt(s_expr[2]);
        var m = Math.pow(2, b);
        var r = a | m;
        set_value(sim.ep.states[s_expr[1]], r);
        update_cpu_bus_fire(r, b)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["RST_TT"] = {
    nparameters: 3,
    types: ["E", "I"],
    operation: function(s_expr) {
        var a = get_value(sim.ep.states[s_expr[1]]) << 0;
        var b = parseInt(s_expr[2]);
        var m = Math.pow(2, b);
        var r = a & ~m;
        set_value(sim.ep.states[s_expr[1]], r);
        update_cpu_bus_fire(r, b)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["CHECK_RTD"] = {
    nparameters: 1,
    operation: function(s_expr) {
        var number_active_tri = parseInt(simhw_sim_signal("TD").value) + parseInt(simhw_sim_signal("R").value);
        update_system_bus_fire(number_active_tri)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["MBIT"] = {
    nparameters: 5,
    types: ["X", "X", "I", "I"],
    operation: function(s_expr) {
        var sim_elto_dst = get_reference(s_expr[1]);
        var sim_elto_org = get_reference(s_expr[2]);
        var offset = parseInt(s_expr[3]);
        var size = parseInt(s_expr[4]);
        var n1 = get_value(sim_elto_org).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        set_value(sim_elto_dst, parseInt(n2, 2))
    },
    verbal: function(s_expr) {
        var sim_elto_dst = get_reference(s_expr[1]);
        var sim_elto_org = get_reference(s_expr[2]);
        var offset = parseInt(s_expr[3]);
        var size = parseInt(s_expr[4]);
        var n1 = get_value(sim_elto_org).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        var n3 = parseInt(n2, 2);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n3) + " (copied " + size + " bits from bit " + offset + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " (" + show_value(n3) + ", " + size + " bits from bit " + offset + "). "
    }
};
sim.ep.behaviors["MBIT_SN"] = {
    nparameters: 5,
    types: ["S", "E", "E", "I"],
    operation: function(s_expr) {
        var base = 0;
        var r = s_expr[3].split("/");
        if (1 == r.length) base = get_value(sim.ep.states[s_expr[3]]);
        else if (typeof sim.ep.states[r[0]].value[r[1]] != "undefined") base = sim.ep.states[r[0]].value[r[1]];
        else if (typeof sim.ep.signals[r[1]].default_value != "undefined") base = sim.ep.signals[r[1]].default_value;
        else if (typeof sim.ep.states[r[1]].default_value != "undefined") base = sim.ep.states[r[1]].default_value;
        else ws_alert("WARN: undefined state/field pair -> " + r[0] + "/" + r[1]);
        var offset = parseInt(s_expr[4]);
        var n1 = get_value(sim.ep.states[s_expr[2]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - (base + offset - 1), offset);
        set_value(sim.ep.signals[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        var base = 0;
        var r = s_expr[3].split("/");
        if (1 == r.length) base = get_value(sim.ep.states[s_expr[3]]);
        else if (typeof sim.ep.states[r[0]].value[r[1]] != "undefined") base = sim.ep.states[r[0]].value[r[1]];
        else if (typeof sim.ep.signals[r[1]].default_value != "undefined") base = sim.ep.signals[r[1]].default_value;
        else if (typeof sim.ep.states[r[1]].default_value != "undefined") base = sim.ep.states[r[1]].default_value;
        else ws_alert("WARN: undefined state/field pair -> " + r[0] + "/" + r[1]);
        var offset = parseInt(s_expr[4]);
        var n1 = get_value(sim.ep.states[s_expr[2]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - (base + offset - 1), offset);
        var from_elto = "";
        if (1 == r.length) from_elto = show_verbal(s_expr[3]);
        else from_elto = show_verbal(s_expr[2]) + "[" + r[1] + "] ";
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + from_elto + "into " + show_verbal(s_expr[1]) + " " + "value " + parseInt(n3, 2) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + from_elto + " (" + parseInt(n3, 2) + "). "
    }
};
sim.ep.behaviors["SBIT_SIGNAL"] = {
    nparameters: 4,
    types: ["X", "I", "I"],
    operation: function(s_expr) {
        sim_elto_dst = get_reference(s_expr[1]);
        var new_value = sim_elto_dst.value;
        var mask = 1 << s_expr[3];
        if (s_expr[2] == "1") new_value = new_value | mask;
        else new_value = new_value & ~mask;
        set_value(sim_elto_dst, new_value >>> 0)
    },
    verbal: function(s_expr) {
        sim_elto_dst = get_reference(s_expr[1]);
        var new_value = sim_elto_dst.value;
        var mask = 1 << s_expr[3];
        if (s_expr[2] == "1") new_value = new_value | mask;
        else new_value = new_value & ~mask;
        return compute_signal_verbals(s_expr[1], new_value >>> 0)
    }
};
sim.ep.behaviors["UPDATE_FLAG"] = {
    nparameters: 4,
    types: ["X", "X", "I"],
    operation: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        var new_value = sim_elto_dst.value & ~(1 << s_expr[3]) | sim_elto_org.value << s_expr[3];
        set_value(sim_elto_dst, new_value >>> 0)
    },
    verbal: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Update " + show_verbal(s_expr[2]) + " to value " + sim_elto_org.value + ". "
        }
        return show_verbal(s_expr[1]) + "." + show_verbal(s_expr[3]) + " = " + sim_elto_org.value + ". "
    }
};
sim.ep.behaviors["MBITS"] = {
    nparameters: 8,
    types: ["E", "I", "E", "S", "S", "I", "S"],
    operation: function(s_expr) {
        var offset = parseInt(sim.ep.signals[s_expr[4]].value);
        var size = parseInt(sim.ep.signals[s_expr[5]].value);
        var n1 = get_value(sim.ep.states[s_expr[3]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        if ("1" == sim.ep.signals[s_expr[7]].value && "1" == n2.substr(0, 1)) {
            n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2
        }
        set_value(sim.ep.states[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        var offset = parseInt(sim.ep.signals[s_expr[4]].value);
        var size = parseInt(sim.ep.signals[s_expr[5]].value);
        var n1 = get_value(sim.ep.states[s_expr[3]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        if ("1" == sim.ep.signals[s_expr[7]].value && "1" == n2.substr(0, 1)) {
            n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2
        }
        n1 = parseInt(n3, 2);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return " Copy from " + show_verbal(s_expr[3]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n1) + " (copied " + size + " bits from bit " + offset + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[3]) + " (" + show_value(n1) + ", " + size + " bits from bit " + offset + "). "
    }
};
sim.ep.behaviors["BSEL"] = {
    nparameters: 6,
    types: ["E", "I", "I", "E", "I"],
    operation: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var poso = parseInt(s_expr[5]);
        var len = parseInt(s_expr[3]);
        var n1 = get_value(sim.ep.states[s_expr[4]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (poso + len) + 1, len);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var n4 = "00000000000000000000000000000000".substr(0, posd);
        n3 = n3 + n4;
        set_value(sim.ep.states[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var len = parseInt(s_expr[3]);
        var poso = parseInt(s_expr[5]);
        var n1 = get_value(sim.ep.states[s_expr[4]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (poso + len) + 1, len);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var n4 = "00000000000000000000000000000000".substr(0, posd);
        n3 = n3 + n4;
        var n5 = parseInt(n3, 2);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + show_verbal(s_expr[4]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n5) + " (copied " + len + " bits, from bit " + poso + " of " + s_expr[4] + " to bit " + posd + " of " + s_expr[1] + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[4]) + " (" + show_value(n5) + ", " + len + " bits, from bit " + poso + " of " + s_expr[4] + " to bit " + posd + " of " + s_expr[1] + "). "
    }
};
sim.ep.behaviors["EXT_SIG"] = {
    nparameters: 3,
    types: ["E", "I"],
    operation: function(s_expr) {
        var n1 = get_value(sim.ep.states[s_expr[1]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - s_expr[2], 31);
        var n4 = n3;
        if ("1" == n2[31 - s_expr[2]]) {
            n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4
        }
        set_value(sim.ep.states[s_expr[1]], parseInt(n4, 2))
    },
    verbal: function(s_expr) {
        var n1 = get_value(sim.ep.states[s_expr[1]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - s_expr[2], 31);
        var n4 = n3;
        if ("1" == n2[31 - s_expr[2]]) {
            n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4
        }
        var n5 = parseInt(n4, 2);
        return "Sign Extension with value " + show_value(n5) + ". "
    }
};
sim.ep.behaviors["MOVE_BITS"] = {
    nparameters: 5,
    types: ["S", "I", "I", "S"],
    operation: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var poso = 0;
        var len = parseInt(s_expr[3]);
        var n1 = sim.ep.signals[s_expr[4]].value.toString(2);
        n1 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n1 = n1.substr(31 - poso - len + 1, len);
        var n2 = sim.ep.signals[s_expr[1]].value.toString(2);
        n2 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var m1 = n2.substr(0, 32 - (posd + len));
        var m2 = n2.substr(31 - posd + 1, posd);
        var n3 = m1 + n1 + m2;
        set_value(sim.ep.signals[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["MOVE_BITSE"] = {
    nparameters: 6,
    types: ["S", "I", "I", "E", "I"],
    operation: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var poso = parseInt(s_expr[5]);
        var len = parseInt(s_expr[3]);
        var n1 = get_value(sim.ep.states[s_expr[4]]).toString(2);
        n1 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n1 = n1.substr(31 - poso - len + 1, len);
        var n2 = sim.ep.signals[s_expr[1]].value.toString(2);
        n2 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var m1 = n2.substr(0, 32 - (posd + len));
        var m2 = n2.substr(31 - posd + 1, posd);
        var n3 = m1 + n1 + m2;
        set_value(sim.ep.signals[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["DECO"] = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.states["INEX"].value = 0;
        var oi = decode_instruction(sim.ep.internal_states.FIRMWARE, sim.ep.ctrl_states.ir, get_value(sim.ep.states["REG_IR"]));
        if (null == oi.oinstruction) {
            ws_alert("ERROR: undefined instruction code in IR (" + "co:" + oi.op_code.toString(2) + ", " + "cop:" + oi.cop_code.toString(2) + ")");
            sim.ep.states["ROM_MUXA"].value = 0;
            sim.ep.states["INEX"].value = 1;
            return -1
        }
        var rom_addr = oi.op_code << 6;
        if (typeof oi.oinstruction.cop != "undefined") {
            rom_addr = rom_addr + oi.cop_code
        }
        if (typeof sim.ep.internal_states["ROM"][rom_addr] == "undefined") {
            ws_alert("ERROR: undefined rom address " + rom_addr + " in firmware");
            sim.ep.states["ROM_MUXA"].value = 0;
            return -1
        }
        sim.ep.states["ROM_MUXA"].value = sim.ep.internal_states["ROM"][rom_addr];
        var val = get_value(sim.ep.states["DECO_INS"]);
        set_value(sim.ep.states["DECO_INS"], val + 1);
        var pc = get_value(sim.ep.states["REG_PC"]) - 4;
        var decins = get_deco_from_pc(pc);
        set_value(sim.ep.states["REG_IR_DECO"], decins);
        show_dbg_ir(get_value(sim.ep.states["REG_IR_DECO"]))
    },
    verbal: function(s_expr) {
        return "Decode instruction. "
    }
};
sim.ep.behaviors["FIRE"] = {
    nparameters: 2,
    types: ["S"],
    operation: function(s_expr) {
        if (sim.ep.internal_states.fire_stack.indexOf(s_expr[1]) != -1) {
            return
        }
        sim.ep.internal_states.fire_stack.push(s_expr[1]);
        update_draw(sim.ep.signals[s_expr[1]], sim.ep.signals[s_expr[1]].value);
        if ("L" == sim.ep.signals[s_expr[1]].type) {
            update_state(s_expr[1])
        }
        sim.ep.internal_states.fire_stack.pop(s_expr[1])
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["FIRE_IFSET"] = {
    nparameters: 3,
    types: ["S", "I"],
    operation: function(s_expr) {
        if (get_value(sim.ep.signals[s_expr[1]]) != parseInt(s_expr[2])) {
            return
        }
        sim.ep.behaviors["FIRE"].operation(s_expr)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["FIRE_IFCHANGED"] = {
    nparameters: 3,
    types: ["S", "X"],
    operation: function(s_expr) {
        sim_elto = get_reference(s_expr[2]);
        if (sim_elto.changed == false) {
            return
        }
        sim.ep.behaviors["FIRE"].operation(s_expr)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["RESET_CHANGED"] = {
    nparameters: 2,
    types: ["X"],
    operation: function(s_expr) {
        sim_elto = get_reference(s_expr[1]);
        sim_elto.changed = false
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["CLOCK"] = {
    nparameters: 1,
    operation: function(s_expr) {
        var new_maddr = null;
        var mcelto = null;
        var t0 = performance.now();
        var val = get_value(sim.ep.states["CLK"]);
        set_value(sim.ep.states["CLK"], val + 1);
        set_value(sim.ep.states["TTCPU"], 0);
        new_maddr = get_value(sim.ep.states["REG_MICROADDR"]);
        mcelto = sim.ep.internal_states["MC"][new_maddr];
        if (typeof mcelto !== "undefined" && false == mcelto.is_native) {
            for (var i = 0; i < jit_fire_order.length; i++) {
                fn_updateE_now(jit_fire_order[i])
            }
        }
        new_maddr = get_value(sim.ep.states["MUXA_MICROADDR"]);
        set_value(sim.ep.states["REG_MICROADDR"], new_maddr);
        mcelto = sim.ep.internal_states["MC"][new_maddr];
        if (typeof mcelto === "undefined") {
            mcelto = {
                value: sim.ep.states["REG_MICROINS"].default_value,
                is_native: false
            }
        }
        var new_mins = Object.create(get_value(mcelto));
        sim.ep.states["REG_MICROINS"].value = new_mins;
        for (var key in sim.ep.signals) {
            if (typeof new_mins[key] != "undefined") set_value(sim.ep.signals[key], new_mins[key]);
            else set_value(sim.ep.signals[key], sim.ep.signals[key].default_value)
        }
        if (mcelto.is_native) {
            if (typeof mcelto.NATIVE_JIT != "undefined") mcelto.NATIVE_JIT();
            else if (typeof mcelto.NATIVE != "undefined") eval(mcelto.NATIVE)
        } else {
            for (var i = 0; i < jit_fire_order.length; i++) {
                fn_updateL_now(jit_fire_order[i])
            }
        }
        var t1 = performance.now();
        var val = get_value(sim.ep.states["ACC_TIME"]);
        val = val + (t1 - t0);
        set_value(sim.ep.states["ACC_TIME"], val);
        val = Math.trunc(16 * val);
        set_value(sim.ep.states["ACC_PWR"], val)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["CPU_RESET"] = {
    nparameters: 1,
    operation: function(s_expr) {
        for (var key in sim.ep.states) {
            reset_value(sim.ep.states[key])
        }
        for (var key in sim.ep.signals) {
            reset_value(sim.ep.signals[key])
        }
    },
    verbal: function(s_expr) {
        return "Reset CPU. "
    }
};
sim.ep.behaviors["UPDATEDPC"] = {
    nparameters: 1,
    operation: function(s_expr) {
        show_asmdbg_pc()
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.ep.behaviors["UPDATE_NZVC"] = {
    nparameters: 1,
    operation: function(s_expr) {
        set_value(simhw_sim_state("FLAG_N"), sim.ep.internal_states.alu_flags.flag_n);
        set_value(simhw_sim_state("FLAG_Z"), sim.ep.internal_states.alu_flags.flag_z);
        set_value(simhw_sim_state("FLAG_V"), sim.ep.internal_states.alu_flags.flag_v);
        set_value(simhw_sim_state("FLAG_C"), sim.ep.internal_states.alu_flags.flag_c);
        set_value(simhw_sim_signal("TEST_N"), sim.ep.internal_states.alu_flags.flag_n);
        set_value(simhw_sim_signal("TEST_Z"), sim.ep.internal_states.alu_flags.flag_z);
        set_value(simhw_sim_signal("TEST_V"), sim.ep.internal_states.alu_flags.flag_v);
        set_value(simhw_sim_signal("TEST_C"), sim.ep.internal_states.alu_flags.flag_c);
        update_draw(sim.ep.signals["TEST_N"], sim.ep.signals["TEST_N"].value);
        update_draw(sim.ep.signals["TEST_Z"], sim.ep.signals["TEST_Z"].value);
        update_draw(sim.ep.signals["TEST_V"], sim.ep.signals["TEST_V"].value);
        update_draw(sim.ep.signals["TEST_C"], sim.ep.signals["TEST_C"].value)
    },
    verbal: function(s_expr) {
        return "Update flags N-Z-V-C."
    }
};
sim.ep.elements.cpu_t1 = {
    name: "T1",
    description: "Tristate 1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MBR"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T1"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t2 = {
    name: "T2",
    description: "Tristate 2",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_PC"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T2"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t3 = {
    name: "T3",
    description: "Tristate 3",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "SELEC_T3"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T3"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t4 = {
    name: "T4",
    description: "Tristate 4",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_RT1"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T4"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t5 = {
    name: "T5",
    description: "Tristate 5",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_RT2"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T5"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t6 = {
    name: "T6",
    description: "Tristate 6",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "ALU_C6"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T6"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t7 = {
    name: "T7",
    description: "Tristate 7",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_RT3"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T7"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t8 = {
    name: "T8",
    description: "Tristate 8",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_SR"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T8"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t9 = {
    name: "T9",
    description: "Tristate 9",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "RA_T9"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T9"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t10 = {
    name: "T10",
    description: "Tristate 10",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "RB_T10"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T10"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t11 = {
    name: "T11",
    description: "Tristate 11",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MICROINS"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T11"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_t12 = {
    name: "T12",
    description: "Tristate 12",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "HPC_T12"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T12"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_ta = {
    name: "Ta",
    description: "Tristate A",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MAR"
        },
        out: {
            ref: "BUS_AB"
        }
    },
    signals: {
        ctl: {
            ref: "TA"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_tb = {
    name: "Td",
    description: "Tristate D",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BS_TD"
        },
        out: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ctl: {
            ref: "TD"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cpu_mux_a = {
    name: "MUX A",
    description: "MUX A",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "RA_T9"
        },
        mux_1: {
            ref: "REG_RT1"
        },
        mux_o: {
            ref: "MA_ALU"
        }
    },
    signals: {
        ma: {
            ref: "MA"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ma"],
    signals_output: []
};
sim.ep.elements.cpu_mux_b = {
    name: "MUX B",
    description: "MUX B",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "RB_T10"
        },
        mux_1: {
            ref: "REG_RT2"
        },
        mux_2: {
            ref: "VAL_FOUR"
        },
        mux_3: {
            ref: "VAL_ONE"
        },
        mux_o: {
            ref: "MB_ALU"
        }
    },
    signals: {
        mb: {
            ref: "MB"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mb"],
    signals_output: []
};
sim.ep.elements.cpu_mux_1 = {
    name: "MUX 1",
    description: "MUX 1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "BUS_IB"
        },
        mux_1: {
            ref: "BS_M1"
        },
        mux_o: {
            ref: "M1_C1"
        }
    },
    signals: {
        m1: {
            ref: "M1"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["m1"],
    signals_output: []
};
sim.ep.elements.cpu_mux_2 = {
    name: "MUX 2",
    description: "MUX 2",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "BUS_IB"
        },
        mux_1: {
            ref: "REG_PC"
        },
        mux_o: {
            ref: "M2_C2"
        }
    },
    signals: {
        m2: {
            ref: "M2"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["m2"],
    signals_output: []
};
sim.ep.elements.cpu_mux_7 = {
    name: "MUX 7",
    description: "MUX 7",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "BUS_IB"
        },
        mux_1: {
            ref: "SELP_M7"
        },
        mux_o: {
            ref: "M7_C7"
        }
    },
    signals: {
        m7: {
            ref: "M7"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["m7"],
    signals_output: []
};
sim.ep.elements.cpu_mux_h = {
    name: "MUX H",
    description: "MUX H",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "CLK"
        },
        mux_1: {
            ref: "ACC_TIME"
        },
        mux_2: {
            ref: "ACC_PWR"
        },
        mux_3: {
            ref: "VAL_ZERO"
        },
        mux_o: {
            ref: "HPC_T12"
        }
    },
    signals: {
        mh: {
            ref: "MH"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mh"],
    signals_output: []
};
sim.ep.elements.cu_mux_a = {
    name: "MUX A",
    description: "MUX A",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_MICROADDR"
        },
        mux_1: {
            ref: "REG_MICROINS/MADDR"
        },
        mux_2: {
            ref: "ROM_MUXA"
        },
        mux_3: {
            ref: "FETCH"
        },
        mux_o: {
            ref: "MUXA_MICROADDR"
        }
    },
    signals: {
        a0: {
            ref: "A0A1"
        },
        a1: {
            ref: "A0A1"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3"],
    states_outputs: ["mux_o"],
    signals_inputs: ["a0", "a1"],
    signals_output: []
};
sim.ep.elements.cu_mux_b = {
    name: "MUX B",
    description: "MUX B",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "MUXC_MUXB"
        },
        mux_1: {
            ref: "MUXC_MUXB"
        },
        mux_o: {
            ref: "A1"
        }
    },
    signals: {
        mb: {
            ref: "B"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mb"],
    signals_output: []
};
sim.ep.elements.cu_mux_c = {
    name: "MUX C",
    description: "MUX C",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "VAL_ZERO"
        },
        mux_1: {
            ref: "INT"
        },
        mux_2: {
            ref: "IORDY"
        },
        mux_3: {
            ref: "MRDY"
        },
        mux_4: {
            ref: "REG_SR/0"
        },
        mux_5: {
            ref: "REG_SR/1"
        },
        mux_6: {
            ref: "REG_SR/28"
        },
        mux_7: {
            ref: "REG_SR/29"
        },
        mux_8: {
            ref: "REG_SR/30"
        },
        mux_9: {
            ref: "REG_SR/31"
        },
        mux_10: {
            ref: "INEX"
        },
        mux_o: {
            ref: "MUXC_MUXB"
        }
    },
    signals: {
        ctl: {
            ref: "C"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3", "mux_4", "mux_5", "mux_6", "mux_7", "mux_8", "mux_9", "mux_10"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cu_mux_ra = {
    name: "MUX RA",
    description: "MUX MR",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELA"
        },
        mux_o: {
            ref: "RA"
        }
    },
    signals: {
        ctl: {
            ref: "MR_RA"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.cu_mux_rb = {
    name: "MUX RB",
    description: "MUX MR",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELB"
        },
        mux_o: {
            ref: "RB"
        }
    },
    signals: {
        mr: {
            ref: "MR_RB"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mr"],
    signals_output: []
};
sim.ep.elements.cu_mux_rc = {
    name: "MUX RC",
    description: "MUX MR",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELC"
        },
        mux_o: {
            ref: "RC"
        }
    },
    signals: {
        mr: {
            ref: "MR_RC"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mr"],
    signals_output: []
};
sim.ep.elements.cu_mux_mc = {
    name: "MUX MC",
    description: "MUX MC",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELCOP"
        },
        mux_o: {
            ref: "COP"
        }
    },
    signals: {
        ctl: {
            ref: "MC"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.mar = {
    name: "MAR",
    description: "Memory Address Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_MAR"
        }
    },
    signals: {
        c0: {
            ref: "C0"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["c0"],
    signals_output: []
};
sim.ep.elements.mbr = {
    name: "MBR",
    description: "Memory Data Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "M1_C1"
        },
        out: {
            ref: "REG_MBR"
        }
    },
    signals: {
        c1: {
            ref: "C1"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["c1"],
    signals_output: []
};
sim.ep.elements.pc = {
    name: "PC",
    description: "Programm Counter",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "M2_C2"
        },
        out: {
            ref: "REG_PC"
        }
    },
    signals: {
        ctl: {
            ref: "C2"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.ir = {
    name: "IR",
    description: "Instruction Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_IR"
        }
    },
    signals: {
        c3: {
            ref: "C3"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["c3"],
    signals_output: []
};
sim.ep.elements.rt1 = {
    name: "RT1",
    description: "Temporal Register 1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_RT1"
        }
    },
    signals: {
        ctl: {
            ref: "C4"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.rt2 = {
    name: "RT2",
    description: "Temporal Register 2",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_RT2"
        }
    },
    signals: {
        ctl: {
            ref: "C5"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.rt3 = {
    name: "RT3",
    description: "Temporal Register 3",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "ALU_C6"
        },
        out: {
            ref: "REG_RT3"
        }
    },
    signals: {
        ctl: {
            ref: "C6"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.sr = {
    name: "SR",
    description: "State Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "M7_C7"
        },
        out: {
            ref: "REG_SR"
        }
    },
    signals: {
        ctl: {
            ref: "C7"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.ep.elements.register_file = {
    name: "RF",
    description: "Register File",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        a: {
            ref: "RA_T9"
        },
        b: {
            ref: "RB_T10"
        },
        c: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ra: {
            ref: "RA"
        },
        rb: {
            ref: "RB"
        },
        rc: {
            ref: "RC"
        },
        lc: {
            ref: "LC"
        }
    },
    states_inputs: ["c"],
    states_outputs: ["a", "b"],
    signals_inputs: ["ra", "rb", "rc", "lc"],
    signals_output: []
};
sim.ep.elements.cpu_alu = {
    name: "ALU",
    description: "Arithmetic-Logit Unit",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        a: {
            ref: "MA_ALU"
        },
        b: {
            ref: "MB_ALU"
        },
        alu: {
            ref: "ALU_C6"
        },
        flags: {
            ref: "SELP_M7"
        }
    },
    signals: {
        cop: {
            ref: "COP"
        }
    },
    states_inputs: ["a", "b"],
    states_outputs: ["alu", "flags"],
    signals_inputs: ["cop"],
    signals_output: []
};
sim.ep.elements.select_sr = {
    name: "Select SR",
    description: "SR register value selector",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_1: {
            ref: "FLAG_U"
        },
        mux_2: {
            ref: "FLAG_I"
        },
        mux_3: {
            ref: "SELP_M7"
        },
        mux_o: {
            ref: "SELP_M7"
        }
    },
    signals: {
        selp: {
            ref: "SELP"
        }
    },
    states_inputs: ["mux_1", "mux_2", "mux_3"],
    states_outputs: ["mux_o"],
    signals_inputs: ["selp"],
    signals_output: []
};
sim.ep.elements.select_ir = {
    name: "Select IR",
    description: "Instruction Register value selector",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_i: {
            ref: "REG_IR"
        },
        mux_o: {
            ref: "SELEC_T3"
        }
    },
    signals: {
        se: {
            ref: "SE"
        },
        size: {
            ref: "SIZE"
        },
        offset: {
            ref: "OFFSET"
        }
    },
    states_inputs: ["mux_i"],
    states_outputs: ["mux_o"],
    signals_inputs: ["se", "size", "offset"],
    signals_output: []
};
sim.ep.elements.byte_selector = {
    name: "Byte Selector",
    description: "Main memory byte selector",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        from_mbr: {
            ref: "REG_MBR"
        },
        from_data: {
            ref: "BUS_DB"
        },
        be: {
            ref: "BE"
        },
        to_mbr: {
            ref: "BS_M1"
        },
        to_td: {
            ref: "BS_TD"
        }
    },
    signals: {
        w: {
            ref: "W"
        },
        se: {
            ref: "SE"
        },
        a1a0: {
            ref: "A1A0"
        },
        bw: {
            ref: "BW"
        }
    },
    states_inputs: ["from_mbr", "from_data"],
    states_outputs: ["be", "to_mbr", "to_td"],
    signals_inputs: ["w", "se", "a1a0", "bw"],
    signals_output: []
};
sim.ep.components.MEMORY = {
    name: "MEMORY",
    version: "1",
    abilities: ["MEMORY"],
    details_name: ["MEMORY", "MEMORY_CONFIG"],
    details_fire: [
        ["svg_p:text3001"],
        []
    ],
    write_state: function(vec) {
        if (typeof vec.MEMORY == "undefined") vec.MEMORY = {};
        var key = 0;
        var value = 0;
        for (var index in sim.ep.internal_states.MP) {
            value = main_memory_getvalue(sim.ep.internal_states.MP, index);
            value = parseInt(value);
            if (value != 0) {
                key = parseInt(index).toString(16);
                vec.MEMORY["0x" + key] = {
                    type: "memory",
                    default_value: 0,
                    id: "0x" + key,
                    op: "=",
                    value: "0x" + value.toString(16)
                }
            }
        }
        return vec
    },
    read_state: function(vec, check) {
        if (typeof vec.MEMORY == "undefined") vec.MEMORY = {};
        var key = parseInt(check.id).toString(16);
        var val = parseInt(check.value).toString(16);
        if ("MEMORY" == check.type.toUpperCase().trim()) {
            vec.MEMORY["0x" + key] = {
                type: "memory",
                default_value: 0,
                id: "0x" + key,
                op: check.condition,
                value: "0x" + val
            };
            return true
        }
        return false
    },
    get_state: function(pos) {
        var index = parseInt(pos);
        var value = main_memory_getvalue(sim.ep.internal_states.MP, elto);
        if (typeof value === "undefined") {
            return null
        }
        return "0x" + parseInt(value).toString(16)
    },
    get_value: function(elto) {
        var value = main_memory_getvalue(sim.ep.internal_states.MP, elto);
        show_main_memory(sim.ep.internal_states.MP, elto, false, false);
        return value >>> 0
    },
    set_value: function(elto, value) {
        var origin = "";
        var r_value = main_memory_get_program_counter();
        if (r_value != null) {
            origin = "PC=0x" + r_value.toString(16)
        }
        var melto = {
            value: value >>> 0,
            source_tracking: [origin],
            comments: null
        };
        var valref = main_memory_set(sim.ep.internal_states.MP, elto, melto);
        show_main_memory(sim.ep.internal_states.MP, elto, typeof valref === "undefined", true);
        return value
    }
};
sim.ep.internal_states.segments = {};
sim.ep.internal_states.MP = {};
sim.ep.internal_states.MP_wc = 0;
sim.ep.signals.MRDY = {
    name: "MRDY",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    depends_on: ["CLK"],
    behavior: ["FIRE_IFCHANGED MRDY C", "FIRE_IFCHANGED MRDY C"],
    fire_name: ["svg_p:tspan3916", "svg_p:text3909"],
    draw_data: [
        [],
        ["svg_p:path3895", "svg_p:path3541"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.R = {
    name: "R",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; CHECK_RTD", "MEM_READ BUS_AB BUS_DB BWA MRDY CLK; FIRE MRDY; CHECK_RTD"],
    fire_name: ["svg_p:text3533-5-2", "svg_p:text3713"],
    draw_data: [
        [],
        ["svg_p:path3557", "svg_p:path3571"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.W = {
    name: "W",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MEM_WRITE BUS_AB BUS_DB BWA MRDY CLK; FIRE MRDY"],
    fire_name: ["svg_p:text3533-5-08", "svg_p:text3527", "svg_p:text3431-7"],
    draw_data: [
        [],
        ["svg_p:path3559", "svg_p:path3575", "svg_p:path3447-7"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.behaviors.MEM_READ = {
    nparameters: 6,
    types: ["E", "E", "S", "S", "E"],
    operation: function(s_expr) {
        var address = sim.ep.states[s_expr[1]].value;
        var dbvalue = sim.ep.states[s_expr[2]].value;
        var bw = sim.ep.signals[s_expr[3]].value;
        var clk = get_value(sim.ep.states[s_expr[5]].value);
        sim.ep.signals[s_expr[4]].value = 0;
        var remain = get_var(sim.ep.internal_states.MP_wc);
        if (typeof sim.ep.events.mem[clk - 1] != "undefined" && sim.ep.events.mem[clk - 1] > 0) {
            remain = sim.ep.events.mem[clk - 1] - 1
        }
        sim.ep.events.mem[clk] = remain;
        if (remain > 0) {
            return
        }
        address = address & 4294967292;
        var value = main_memory_getvalue(sim.ep.internal_states.MP, address);
        var full_redraw = false;
        if (typeof value === "undefined") {
            value = 0;
            full_redraw = true
        }
        dbvalue = main_memory_fusionvalues(dbvalue, value, bw);
        sim.ep.states[s_expr[2]].value = dbvalue >>> 0;
        sim.ep.signals[s_expr[4]].value = 1;
        show_main_memory(sim.ep.internal_states.MP, address, full_redraw, false)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var address = sim.ep.states[s_expr[1]].value;
        var dbvalue = sim.ep.states[s_expr[2]].value;
        var bw = sim.ep.signals[s_expr[3]].value;
        var clk = get_value(sim.ep.states[s_expr[5]].value);
        var bw_type = "word";
        if (0 == (bw & 12)) bw_type = "byte";
        else if (1 == (bw & 12)) bw_type = "half";
        var value = main_memory_getvalue(sim.ep.internal_states.MP, address);
        if (typeof value === "undefined") value = 0;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            verbal = "Try to read a " + bw_type + " from memory " + "at address 0x" + address.toString(16) + " with value 0x" + value.toString(16) + ". "
        }
        verbal = "Memory output = 0x" + value.toString(16) + " (Read a " + bw_type + " from 0x" + address.toString(16) + "). ";
        return verbal
    }
};
sim.ep.behaviors.MEM_WRITE = {
    nparameters: 6,
    types: ["E", "E", "S", "S", "E"],
    operation: function(s_expr) {
        var address = sim.ep.states[s_expr[1]].value;
        var dbvalue = sim.ep.states[s_expr[2]].value;
        var bw = sim.ep.signals[s_expr[3]].value;
        var clk = get_value(sim.ep.states[s_expr[5]].value);
        sim.ep.signals[s_expr[4]].value = 0;
        var remain = get_var(sim.ep.internal_states.MP_wc);
        if (typeof sim.ep.events.mem[clk - 1] != "undefined" && sim.ep.events.mem[clk - 1] > 0) {
            remain = sim.ep.events.mem[clk - 1] - 1
        }
        sim.ep.events.mem[clk] = remain;
        if (remain > 0) {
            return
        }
        address = address & 4294967292;
        var value = main_memory_getvalue(sim.ep.internal_states.MP, address);
        var full_redraw = false;
        if (typeof value === "undefined") {
            value = 0;
            full_redraw = true
        }
        value = main_memory_fusionvalues(value, dbvalue, bw);
        var origin = "";
        var r_value = main_memory_get_program_counter();
        if (r_value != null) {
            origin = "PC=0x" + r_value.toString(16)
        }
        var melto = {
            value: value >>> 0,
            source_tracking: [origin],
            comments: null
        };
        var valref = main_memory_set(sim.ep.internal_states.MP, address, melto);
        sim.ep.signals[s_expr[4]].value = 1;
        show_main_memory(sim.ep.internal_states.MP, address, full_redraw, true)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var address = sim.ep.states[s_expr[1]].value;
        var dbvalue = sim.ep.states[s_expr[2]].value;
        var bw = sim.ep.signals[s_expr[3]].value;
        var clk = get_value(sim.ep.states[s_expr[5]].value);
        var bw_type = "word";
        if (0 == (bw & 12)) bw_type = "byte";
        else if (1 == (bw & 12)) bw_type = "half";
        var value = main_memory_getvalue(sim.ep.internal_states.MP, address);
        if (typeof value === "undefined") value = 0;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            verbal = "Try to write a " + bw_type + " to memory " + "at address 0x" + address.toString(16) + " with value " + value.toString(16) + ". "
        }
        verbal = "Memory[0x" + address.toString(16) + "] = " + "0x" + value.toString(16) + " (Write a " + bw_type + " to 0x" + address.toString(16) + "). ";
        return verbal
    }
};
sim.ep.behaviors.MEMORY_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.events.mem = {}
    },
    verbal: function(s_expr) {
        return "Reset main memory (all values will be zeroes). "
    }
};
sim.ep.elements.memory = {
    name: "Main memory",
    description: "Main memory subsystem",
    type: "subcomponent",
    belongs: "MEMORY",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        },
        mrdy: {
            ref: "MRDY"
        }
    },
    signals: {
        be: {
            ref: "BWA"
        },
        r: {
            ref: "R"
        },
        w: {
            ref: "W"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["mrdy", "data"],
    signals_inputs: ["be", "r", "w"],
    signals_output: []
};
sim.ep.components.IO = {
    name: "IO",
    version: "1",
    abilities: ["IO_TIMER"],
    details_name: ["IO_STATS", "IO_CONFIG"],
    details_fire: [
        ["svg_p:text3775"],
        []
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        var value = get_value(simhw_sim_state(associated_state)) >>> 0;
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_signal("IOR"), 1);
        compute_behavior("FIRE IOR");
        value = get_value(simhw_sim_state("BUS_DB"));
        return value
    },
    set_value: function(elto, value) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        set_value(simhw_sim_state(associated_state), value);
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_state("BUS_DB"), value);
        set_value(simhw_sim_signal("IOW"), 1);
        compute_behavior("FIRE IOW");
        return value
    }
};
sim.ep.internal_states.io_int_factory = [];
sim.ep.internal_states.io_int_factory[0] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[1] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[2] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[3] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[4] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[5] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[6] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.ep.internal_states.io_int_factory[7] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
var IOSR_ID = 4352;
var IOCR_ID = 4356;
var IODR_ID = 4360;
sim.ep.internal_states.io_hash[IOSR_ID] = "IOSR";
sim.ep.internal_states.io_hash[IOCR_ID] = "IOCR";
sim.ep.internal_states.io_hash[IODR_ID] = "IODR";
sim.ep.states.IOSR = {
    name: "IOSR",
    verbal: "IO State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.IOCR = {
    name: "IOCR",
    verbal: "IO Control Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.IODR = {
    name: "IODR",
    verbal: "IO Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.signals.INT = {
    name: "INT",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    depends_on: ["CLK"],
    behavior: ["FIRE C", "FIRE C"],
    fire_name: ["svg_p:tspan4199"],
    draw_data: [
        [],
        ["svg_p:path3809"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.IORDY = {
    name: "IORDY",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    depends_on: ["CLK"],
    behavior: ["FIRE_IFCHANGED IORDY C", "FIRE_IFCHANGED IORDY C"],
    fire_name: ["svg_p:tspan4089", "svg_p:path3793", "svg_p:text3911"],
    draw_data: [
        [],
        ["svg_p:path3897"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.IO_IOR = {
    name: "IO_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "IO_IOR BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE SBWA"],
    fire_name: ["svg_p:tspan4173"],
    draw_data: [
        [],
        ["svg_p:path3795", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.IO_IOW = {
    name: "IO_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "IO_IOW BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE SBWA"],
    fire_name: ["svg_p:text3785-0-6-0-5-5"],
    draw_data: [
        [],
        ["svg_p:path3805", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.IO_IE = {
    name: "IO_IE",
    visible: true,
    type: "L",
    value: 1,
    default_value: 1,
    nbits: "1",
    behavior: ["NOP", "IO_CHK_I CLK INT INTV; FIRE C"],
    fire_name: [],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.INTA = {
    name: "INTA",
    visible: true,
    type: "L",
    value: 1,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "INTA CLK INT INTA BUS_DB INTV; FIRE BW; FIRE C"],
    fire_name: ["svg_p:text3785-0-6-0-5-5-1-1"],
    draw_data: [
        [],
        ["svg_p:path3807", "svg_p:path3737"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.behaviors.IO_IOR = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var iosr = get_value(sim.ep.states[s_expr[3]]);
        var iocr = get_value(sim.ep.states[s_expr[4]]);
        var iodr = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == IOSR_ID) set_value(sim.ep.states[s_expr[2]], iosr);
        if (bus_ab == IOCR_ID) set_value(sim.ep.states[s_expr[2]], iocr);
        if (bus_ab == IODR_ID) set_value(sim.ep.states[s_expr[2]], iodr)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var iosr = get_value(sim.ep.states[s_expr[3]]);
        var iocr = get_value(sim.ep.states[s_expr[4]]);
        var iodr = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == IOSR_ID) verbal = "I/O device read at IOSR of value " + iosr + ". ";
        if (bus_ab == IOCR_ID) verbal = "I/O device read at IOCR of value " + iocr + ". ";
        if (bus_ab == IODR_ID) verbal = "I/O device read at IODR of value " + iodr + ". ";
        return verbal
    }
};
sim.ep.behaviors.IO_IOW = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        if (bus_ab != IOSR_ID && bus_ab != IOCR_ID && bus_ab != IODR_ID) {
            return
        }
        if (bus_ab == IOSR_ID) set_value(sim.ep.states[s_expr[3]], bus_db);
        if (bus_ab == IOCR_ID) set_value(sim.ep.states[s_expr[4]], bus_db);
        if (bus_ab == IODR_ID) set_value(sim.ep.states[s_expr[5]], bus_db);
        var iocr_id = get_value(sim.ep.states[s_expr[4]]);
        var iodr_id = get_value(sim.ep.states[s_expr[5]]);
        if (iocr_id < 0 || iocr_id > 7) return;
        set_var(sim.ep.internal_states.io_int_factory[iocr_id].period, iodr_id);
        set_var(sim.ep.internal_states.io_int_factory[iocr_id].probability, 1);
        if (0 == iodr_id) {
            set_var(sim.ep.internal_states.io_int_factory[iocr_id].probability, 0)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        if (bus_ab == IOSR_ID) verbal = "I/O device write at IOSR with value " + bus_db + ". ";
        if (bus_ab == IOCR_ID) verbal = "I/O device write at IOCR with value " + bus_db + ". ";
        if (bus_ab == IODR_ID) verbal = "I/O device write at IODR with value " + bus_db + ". ";
        return verbal
    }
};
sim.ep.behaviors.IO_CHK_I = {
    nparameters: 4,
    types: ["E", "S", "E"],
    operation: function(s_expr) {
        var clk = get_value(sim.ep.states[s_expr[1]]);
        for (var i = sim.ep.internal_states.io_int_factory.length - 1; i >= 0; i--) {
            if (get_var(sim.ep.internal_states.io_int_factory[i].period) == 0) continue;
            if (get_var(sim.ep.internal_states.io_int_factory[i].active) == true) {
                set_value(sim.ep.signals[s_expr[2]], 1);
                set_value(sim.ep.states[s_expr[3]], i)
            }
            if (clk % get_var(sim.ep.internal_states.io_int_factory[i].period) == 0) {
                if (Math.random() > get_var(sim.ep.internal_states.io_int_factory[i].probability)) continue;
                var acc = get_var(sim.ep.internal_states.io_int_factory[i].accumulated);
                set_var(sim.ep.internal_states.io_int_factory[i].accumulated, acc + 1);
                set_var(sim.ep.internal_states.io_int_factory[i].active, true);
                if (typeof sim.ep.events.io[clk] == "undefined") {
                    sim.ep.events.io[clk] = []
                }
                sim.ep.events.io[clk].push(i);
                set_value(sim.ep.signals[s_expr[2]], 1);
                set_value(sim.ep.states[s_expr[3]], i)
            }
        }
    },
    verbal: function(s_expr) {
        return "Check I/O Interruption. "
    }
};
sim.ep.behaviors.INTA = {
    nparameters: 6,
    types: ["E", "S", "S", "E", "E"],
    operation: function(s_expr) {
        var clk = get_value(sim.ep.states[s_expr[1]]);
        if (typeof sim.ep.events.io[clk] != "undefined") {
            set_value(sim.ep.states[s_expr[4]], sim.ep.events.io[clk][0]);
            return
        }
        set_value(sim.ep.signals[s_expr[2]], 0);
        set_value(sim.ep.states[s_expr[5]], 0);
        for (var i = 0; i < sim.ep.internal_states.io_int_factory.length; i++) {
            if (get_var(sim.ep.internal_states.io_int_factory[i].active)) {
                set_value(sim.ep.signals[s_expr[2]], 0);
                set_value(sim.ep.states[s_expr[5]], i);
                set_value(sim.ep.states[s_expr[4]], i);
                if (typeof sim.ep.events.io[clk] == "undefined") {
                    sim.ep.events.io[clk] = []
                }
                sim.ep.events.io[clk].push(i);
                set_var(sim.ep.internal_states.io_int_factory[i].active, false);
                break
            }
        }
    },
    verbal: function(s_expr) {
        return "Signal an interruption ACK. "
    }
};
sim.ep.behaviors.IO_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.events.io = {};
        for (var i = 0; i < sim.ep.internal_states.io_int_factory.length; i++) {
            set_var(sim.ep.internal_states.io_int_factory[i].accumulated, 0);
            set_var(sim.ep.internal_states.io_int_factory[i].active, false)
        }
    },
    verbal: function(s_expr) {
        return "Reset the I/O device. "
    }
};
sim.ep.elements.io = {
    name: "IO",
    description: "IO",
    type: "subcomponent",
    belongs: "IO",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "IO_IOR"
        },
        iow: {
            ref: "IO_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
sim.ep.components.KBD = {
    name: "KBD",
    version: "1",
    abilities: ["KEYBOARD"],
    details_name: ["KEYBOARD"],
    details_fire: [
        ["svg_p:text3829"]
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        return sim.ep.internal_states.keyboard_content
    },
    set_value: function(elto, value) {
        sim.ep.internal_states.keyboard_content = value;
        return value
    }
};
var KBDR_ID = 256;
var KBSR_ID = 260;
sim.ep.internal_states.io_hash[KBDR_ID] = "KBDR";
sim.ep.internal_states.io_hash[KBSR_ID] = "KBSR";
sim.ep.internal_states.keyboard_content = "";
sim.ep.states.KBDR = {
    name: "KBDR",
    verbal: "Keyboard Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.KBSR = {
    name: "KBSR",
    verbal: "Keyboard Status Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.signals.KBD_IOR = {
    name: "KBD_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "KBD_IOR BUS_AB BUS_DB KBDR KBSR CLK; FIRE SBWA"],
    fire_name: ["svg_p:tspan4057"],
    draw_data: [
        [],
        ["svg_p:path3863", "svg_p:path3847"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.behaviors.KBD_IOR = {
    nparameters: 6,
    types: ["E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var clk = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab != KBDR_ID && bus_ab != KBSR_ID) {
            return
        }
        if (typeof sim.ep.events.keybd[clk] != "undefined") {
            if (bus_ab == KBDR_ID) set_value(sim.ep.states[s_expr[2]], sim.ep.events.keybd[clk]);
            if (bus_ab == KBSR_ID) set_value(sim.ep.states[s_expr[2]], 1);
            return
        }
        if (get_value(sim.ep.states[s_expr[4]]) == 0) {
            var keybuffer = get_keyboard_content();
            if (keybuffer.length !== 0) {
                var keybuffer_rest = keybuffer.substr(1, keybuffer.length - 1);
                set_keyboard_content(keybuffer_rest);
                set_value(sim.ep.states[s_expr[4]], 1);
                set_value(sim.ep.states[s_expr[3]], keybuffer[0].charCodeAt(0))
            }
        }
        if (get_value(sim.ep.states[s_expr[4]]) == 1) {
            sim.ep.events.keybd[clk] = get_value(sim.ep.states[s_expr[3]])
        }
        if (bus_ab == KBSR_ID) {
            set_value(sim.ep.states[s_expr[2]], get_value(sim.ep.states[s_expr[4]]))
        }
        if (bus_ab == KBDR_ID) {
            if (get_value(sim.ep.states[s_expr[4]]) == 1) set_value(sim.ep.states[s_expr[2]], get_value(sim.ep.states[s_expr[3]]));
            set_value(sim.ep.states[s_expr[4]], 0)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var clk = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == KBDR_ID) verbal = "Read the screen data: " + sim.ep.states[s_expr[2]] + ". ";
        if (bus_ab == KBSR_ID) verbal = "Read the screen state: " + sim.ep.states[s_expr[2]] + ". ";
        return verbal
    }
};
sim.ep.behaviors.KBD_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.events.keybd = {}
    },
    verbal: function(s_expr) {
        return "Reset the keyboard content. "
    }
};
sim.ep.elements.keyboard = {
    name: "Keyboard",
    description: "Keyboard",
    type: "subcomponent",
    belongs: "KBD",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "KBD_IOR"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior"],
    signals_output: []
};
sim.ep.components.SCREEN = {
    name: "SCREEN",
    version: "1",
    abilities: ["SCREEN"],
    details_name: ["SCREEN"],
    details_fire: [
        ["svg_p:text3845"]
    ],
    write_state: function(vec) {
        if (typeof vec.SCREEN == "undefined") {
            vec.SCREEN = {}
        }
        var sim_screen = sim.ep.internal_states.screen_content;
        var sim_lines = sim_screen.trim().split("\n");
        for (var i = 0; i < sim_lines.length; i++) {
            value = sim_lines[i];
            if (value != "") {
                vec.SCREEN[i] = {
                    type: "screen",
                    default_value: "",
                    id: i,
                    op: "==",
                    value: value
                }
            }
        }
        return vec
    },
    read_state: function(vec, check) {
        if (typeof vec.SCREEN == "undefined") {
            vec.SCREEN = {}
        }
        if ("SCREEN" == check.type.toUpperCase().trim()) {
            vec.SCREEN[check.id] = {
                type: "screen",
                default_value: "",
                id: check.id,
                op: check.condition,
                value: check.value
            };
            return true
        }
        return false
    },
    get_state: function(line) {
        var sim_screen = sim.ep.internal_states.screen_content;
        var sim_lines = sim_screen.trim().split("\n");
        var index = parseInt(line);
        if (typeof sim_lines[index] != "undefined") return sim_lines[index];
        return null
    },
    get_value: function(elto) {
        return sim.ep.internal_states.screen_content
    },
    set_value: function(elto, value) {
        sim.ep.internal_states.screen_content = value;
        return value
    }
};
var DDR_ID = 4096;
var DSR_ID = 4100;
sim.ep.internal_states.io_hash[DDR_ID] = "DDR";
sim.ep.internal_states.io_hash[DSR_ID] = "DSR";
sim.ep.internal_states.screen_content = "";
sim.ep.states.DDR = {
    name: "DDR",
    verbal: "Display Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.DSR = {
    name: "DSR",
    verbal: "Display State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.signals.SCR_IOR = {
    name: "SCR_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "SCR_IOR BUS_AB BUS_DB DDR DSR CLK"],
    fire_name: ["svg_p:tspan4004"],
    draw_data: [
        [],
        ["svg_p:path3871", "svg_p:path3857"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.SCR_IOW = {
    name: "SCR_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "SCR_IOW BUS_AB BUS_DB DDR DSR CLK"],
    fire_name: ["svg_p:tspan4006"],
    draw_data: [
        [],
        ["svg_p:path3873", "svg_p:path3857"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.behaviors.SCR_IOR = {
    nparameters: 6,
    types: ["E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var ddr = get_value(sim.ep.states[s_expr[3]]);
        var dsr = get_value(sim.ep.states[s_expr[4]]);
        if (bus_ab == DDR_ID) set_value(sim.ep.states[s_expr[2]], ddr);
        if (bus_ab == DSR_ID) set_value(sim.ep.states[s_expr[2]], dsr)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var ddr = get_value(sim.ep.states[s_expr[3]]);
        var dsr = get_value(sim.ep.states[s_expr[4]]);
        if (bus_ab == DDR_ID) verbal = "Try to read from the screen the DDR value " + ddr + ". ";
        if (bus_ab == DDR_ID) verbal = "Try to read into the screen the DSR value " + dsr + ". ";
        return verbal
    }
};
sim.ep.behaviors.SCR_IOW = {
    nparameters: 6,
    types: ["E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        var clk = get_value(sim.ep.states[s_expr[5]]);
        var ch = String.fromCharCode(bus_db);
        if (bus_ab != DDR_ID) {
            return
        }
        if (ch == String.fromCharCode(7)) {
            timbre.reset();
            var s1 = T("sin", {
                freq: 440,
                mul: .5
            });
            var s2 = T("sin", {
                freq: 660,
                mul: .5
            });
            T("perc", {
                r: 500
            }, s1, s2).on("ended", (function() {
                this.pause()
            })).bang().play()
        } else {
            var screen = get_screen_content();
            if (typeof sim.ep.events.screen[clk] != "undefined") screen = screen.substr(0, screen.length - 1);
            set_screen_content(screen + String.fromCharCode(bus_db))
        }
        set_value(sim.ep.states[s_expr[3]], bus_db);
        set_value(sim.ep.states[s_expr[4]], 1);
        sim.ep.events.screen[clk] = bus_db
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        var clk = get_value(sim.ep.states[s_expr[5]]);
        var ch = String.fromCharCode(bus_db);
        if (bus_ab == DDR_ID) verbal = "Try to write into the screen the code " + ch + " at clock cycle " + clk + ". ";
        return verbal
    }
};
sim.ep.behaviors.SCREEN_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.events.screen = {}
    },
    verbal: function(s_expr) {
        return "Reset the screen content. "
    }
};
sim.ep.elements.display = {
    name: "Display",
    description: "Display",
    type: "subcomponent",
    belongs: "SCREEN",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "SCR_IOR"
        },
        iow: {
            ref: "SCR_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
sim.ep.components.L3D = {
    name: "L3D",
    version: "1",
    abilities: ["3DLED"],
    details_name: ["3DLED"],
    details_fire: [
        []
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        var value = get_value(simhw_sim_state(associated_state)) >>> 0;
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_signal("IOR"), 1);
        compute_behavior("FIRE IOR");
        value = get_value(simhw_sim_state("BUS_DB"));
        return value
    },
    set_value: function(elto, value) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        set_value(simhw_sim_state(associated_state), value);
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_state("BUS_DB"), value);
        set_value(simhw_sim_signal("IOW"), 1);
        compute_behavior("FIRE IOW");
        return value
    }
};
sim.ep.internal_states.l3d_dim = 4;
sim.ep.internal_states.l3d_neltos = Math.pow(sim.ep.internal_states.l3d_dim, 3);
sim.ep.internal_states.l3d_state = Array.from({
    length: sim.ep.internal_states.l3d_neltos
}, (() => ({
    active: false
})));
sim.ep.internal_states.l3d_frame = "0".repeat(sim.ep.internal_states.l3d_neltos);
var L3DSR_ID = 8448;
var L3DCR_ID = 8452;
var L3DDR_ID = 8456;
sim.ep.internal_states.io_hash[L3DSR_ID] = "L3DSR";
sim.ep.internal_states.io_hash[L3DCR_ID] = "L3DCR";
sim.ep.internal_states.io_hash[L3DDR_ID] = "L3DDR";
sim.ep.states.L3DSR = {
    name: "L3DSR",
    verbal: "L3D State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.L3DCR = {
    name: "L3DCR",
    verbal: "L3D Control Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.L3DDR = {
    name: "L3DDR",
    verbal: "L3D Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.signals.L3D_IOR = {
    name: "L3D_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "L3D_IOR BUS_AB BUS_DB L3DSR L3DCR L3DDR CLK; FIRE SBWA"],
    fire_name: ["svg_p:tspan4173"],
    draw_data: [
        [],
        ["svg_p:path3795", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.L3D_IOW = {
    name: "L3D_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "L3D_IOW BUS_AB BUS_DB L3DSR L3DCR L3DDR CLK; FIRE SBWA; L3D_SYNC"],
    fire_name: ["svg_p:text3785-0-6-0-5-5"],
    draw_data: [
        [],
        ["svg_p:path3805", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.behaviors.L3D_IOR = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var iosr = get_value(sim.ep.states[s_expr[3]]);
        var iocr = get_value(sim.ep.states[s_expr[4]]);
        var iodr = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == L3DCR_ID) {
            set_value(sim.ep.states[s_expr[2]], iocr)
        }
        if (bus_ab == L3DDR_ID) {
            set_value(sim.ep.states[s_expr[2]], iodr)
        }
        if (bus_ab == L3DSR_ID) {
            var x = (iodr & 4278190080) >> 24;
            var y = (iodr & 16711680) >> 16;
            var z = (iodr & 65280) >> 8;
            var p = z * Math.pow(sim.ep.internal_states.l3d_dim, 2) + y * sim.ep.internal_states.l3d_dim + x;
            var s = get_var(sim.ep.internal_states.l3d_state[p].active);
            set_value(sim.ep.states[s_expr[2]], s)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var iosr = get_value(sim.ep.states[s_expr[3]]);
        var iocr = get_value(sim.ep.states[s_expr[4]]);
        var iodr = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == L3DSR_ID) verbal = "I/O device read at L3DSR of value " + iosr + ". ";
        if (bus_ab == L3DCR_ID) verbal = "I/O device read at L3DCR of value " + iocr + ". ";
        if (bus_ab == L3DDR_ID) verbal = "I/O device read at L3DDR of value " + iodr + ". ";
        return verbal
    }
};
sim.ep.behaviors.L3D_IOW = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        if (bus_ab != L3DSR_ID && bus_ab != L3DCR_ID && bus_ab != L3DDR_ID) {
            return
        }
        if (bus_ab == L3DSR_ID) {
            set_value(sim.ep.states[s_expr[3]], bus_db)
        }
        if (bus_ab == L3DDR_ID) {
            set_value(sim.ep.states[s_expr[5]], bus_db)
        }
        if (bus_ab == L3DCR_ID) {
            set_value(sim.ep.states[s_expr[4]], bus_db);
            var x = (bus_db & 4278190080) >> 24;
            var y = (bus_db & 16711680) >> 16;
            var z = (bus_db & 65280) >> 8;
            var p = z * Math.pow(sim.ep.internal_states.l3d_dim, 2) + y * sim.ep.internal_states.l3d_dim + x;
            var s = (bus_db & 255) != 0;
            set_var(sim.ep.internal_states.l3d_state[p].active, s)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        if (bus_ab == L3DSR_ID) verbal = "I/O device write at L3DSR with value " + bus_db + ". ";
        if (bus_ab == L3DCR_ID) verbal = "I/O device write at L3DCR with value " + bus_db + ". ";
        if (bus_ab == L3DDR_ID) verbal = "I/O device write at L3DDR with value " + bus_db + ". ";
        return verbal
    }
};
sim.ep.behaviors.L3D_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.events.l3d = {};
        var n = sim.ep.internal_states.l3d_state.length;
        for (var i = 0; i < n; i++) {
            set_var(sim.ep.internal_states.l3d_state[i].active, false)
        }
        n = Math.pow(sim.ep.internal_states.l3d_dim, 3);
        var o = "0".repeat(n);
        sim.ep.internal_states.l3d_frame = o;
        simcore_rest_call("L3D", "POST", "/", {
            frame: o
        })
    },
    verbal: function(s_expr) {
        return "Reset the I/O device. "
    }
};
sim.ep.behaviors.L3D_SYNC = {
    nparameters: 1,
    operation: function(s_expr) {
        var l3dstates = sim.ep.internal_states.l3d_state;
        var o = "";
        var p = 0;
        var n = sim.ep.internal_states.l3d_dim;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {
                    p = k * Math.pow(sim.ep.internal_states.l3d_dim, 2) + j * sim.ep.internal_states.l3d_dim + i;
                    if (get_var(l3dstates[p].active)) o = o + "1";
                    else o = o + "0"
                }
            }
        }
        if (sim.ep.internal_states.l3d_frame != o) {
            sim.ep.internal_states.l3d_frame = o;
            simcore_rest_call("L3D", "POST", "/", {
                frame: o
            })
        }
    },
    verbal: function(s_expr) {
        return "Sync State with Device. "
    }
};
sim.ep.elements.l3d = {
    name: "L3D",
    description: "3D Led Cube",
    type: "subcomponent",
    belongs: "L3D",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "L3D_IOR"
        },
        iow: {
            ref: "L3D_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
sim.ep.components.LEDM = {
    name: "LEDM",
    version: "1",
    abilities: ["LEDMATRIX"],
    details_name: ["LEDMATRIX"],
    details_fire: [
        []
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        var value = get_value(simhw_sim_state(associated_state)) >>> 0;
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_signal("IOR"), 1);
        compute_behavior("FIRE IOR");
        value = get_value(simhw_sim_state("BUS_DB"));
        return value
    },
    set_value: function(elto, value) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        set_value(simhw_sim_state(associated_state), value);
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_state("BUS_DB"), value);
        set_value(simhw_sim_signal("IOW"), 1);
        compute_behavior("FIRE IOW");
        return value
    }
};
sim.ep.internal_states.ledm_dim = 24;
sim.ep.internal_states.ledm_neltos = Math.pow(sim.ep.internal_states.ledm_dim, 2);
sim.ep.internal_states.ledm_state = Array.from({
    length: sim.ep.internal_states.ledm_neltos
}, (() => ({
    color: 0
})));
sim.ep.internal_states.color14 = ["#000000", "#FFFFFF", "#FF0000", "#FF8800", "#FFFF00", "#88FF00", "#00FF00", "#00FF88", "#00FFFF", "#0088FF", "#0000FF", "#8800FF", "#FF00FF", "#FF0088"];
sim.ep.internal_states.ledm_colors = sim.ep.internal_states.color14.map((x => x));
sim.ep.internal_states.ledm_frame = "0".repeat(sim.ep.internal_states.ledm_neltos);
var LEDMSR_ID = 12544;
var LEDMCR_ID = 12548;
var LEDMDR_ID = 12552;
sim.ep.internal_states.io_hash[LEDMSR_ID] = "LEDMSR";
sim.ep.internal_states.io_hash[LEDMCR_ID] = "LEDMCR";
sim.ep.internal_states.io_hash[LEDMDR_ID] = "LEDMDR";
sim.ep.states.LEDMSR = {
    name: "LEDMSR",
    verbal: "LEDM State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.LEDMCR = {
    name: "LEDMCR",
    verbal: "LEDM Control Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.states.LEDMDR = {
    name: "LEDMDR",
    verbal: "LEDM Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.ep.signals.LEDM_IOR = {
    name: "LEDM_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LEDM_IOR BUS_AB BUS_DB LEDMSR LEDMCR LEDMDR CLK; FIRE SBWA"],
    fire_name: ["svg_p:tspan4173"],
    draw_data: [
        [],
        ["svg_p:path3795", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.signals.LEDM_IOW = {
    name: "LEDM_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LEDM_IOW BUS_AB BUS_DB LEDMSR LEDMCR LEDMDR CLK; FIRE SBWA; LEDM_SYNC"],
    fire_name: ["svg_p:text3785-0-6-0-5-5"],
    draw_data: [
        [],
        ["svg_p:path3805", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.ep.behaviors.LEDM_IOR = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var iosr = get_value(sim.ep.states[s_expr[3]]);
        var iocr = get_value(sim.ep.states[s_expr[4]]);
        var iodr = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == LEDMCR_ID) {
            set_value(sim.ep.states[s_expr[2]], iocr)
        }
        if (bus_ab == LEDMDR_ID) {
            set_value(sim.ep.states[s_expr[2]], iodr)
        }
        if (bus_ab == LEDMSR_ID) {
            var x = (iodr & 4278190080) >> 24;
            var y = (iodr & 16711680) >> 16;
            var p = y * sim.ep.internal_states.ledm_dim + x;
            var s = get_var(sim.ep.internal_states.ledm_state[p].color);
            set_value(sim.ep.states[s_expr[2]], s)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var iosr = get_value(sim.ep.states[s_expr[3]]);
        var iocr = get_value(sim.ep.states[s_expr[4]]);
        var iodr = get_value(sim.ep.states[s_expr[5]]);
        if (bus_ab == LEDMSR_ID) verbal = "I/O device read at LEDMSR of value " + iosr + ". ";
        if (bus_ab == LEDMCR_ID) verbal = "I/O device read at LEDMCR of value " + iocr + ". ";
        if (bus_ab == LEDMDR_ID) verbal = "I/O device read at LEDMDR of value " + iodr + ". ";
        return verbal
    }
};
sim.ep.behaviors.LEDM_IOW = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        switch (bus_ab) {
            case LEDMSR_ID:
                set_value(sim.ep.states[s_expr[3]], bus_db);
                break;
            case LEDMDR_ID:
                set_value(sim.ep.states[s_expr[5]], bus_db);
                break;
            case LEDMCR_ID:
                set_value(sim.ep.states[s_expr[4]], bus_db);
                break;
            default:
                break
        }
        if (LEDMCR_ID == bus_ab) {
            var dr = get_value(sim.ep.states[s_expr[5]]);
            if (16 & bus_db) {
                var x = (dr & 4278190080) >> 24;
                var y = (dr & 16711680) >> 16;
                var s = dr & 255;
                set_value(sim.ep.states[s_expr[3]], 1);
                if (x >= sim.ep.internal_states.ledm_dim && y >= sim.ep.internal_states.ledm_dim) {
                    set_value(sim.ep.states[s_expr[3]], -1);
                    return
                }
                var p = y * sim.ep.internal_states.ledm_dim + x;
                set_var(sim.ep.internal_states.ledm_state[p].color, s)
            }
            if (32 & bus_db) {
                set_value(sim.ep.states[s_expr[3]], 1);
                var s = 0;
                var neltos = sim.ep.internal_states.ledm_neltos;
                for (var p = 0; p < neltos; p = p + 4) {
                    s = simcore_native_get_value("MEMORY", dr + p);
                    set_var(sim.ep.internal_states.ledm_state[p + 0].color, (s & 255) >> 0);
                    set_var(sim.ep.internal_states.ledm_state[p + 1].color, (s & 65280) >> 8);
                    set_var(sim.ep.internal_states.ledm_state[p + 2].color, (s & 16711680) >> 16);
                    set_var(sim.ep.internal_states.ledm_state[p + 3].color, (s & 4278190080) >> 24)
                }
            }
            if (64 & bus_db) {
                set_value(sim.ep.states[s_expr[3]], 1);
                var s = 0;
                var c = "";
                var neltos = sim.ep.internal_states.ledm_colors.length;
                for (var p = 0; p < neltos; p++) {
                    s = simcore_native_get_value("MEMORY", dr + p * 4);
                    s = (s & 4294967040) >>> 8;
                    s = s.toString(16);
                    c = "#" + simcoreui_pack(s, 6);
                    sim.ep.internal_states.ledm_colors[p] = c
                }
            }
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.ep.states[s_expr[1]]);
        var bus_db = get_value(sim.ep.states[s_expr[2]]);
        switch (bus_ab) {
            case LEDMSR_ID:
                verbal = "I/O device write at LEDMSR with value " + bus_db + ". ";
                break;
            case LEDMDR_ID:
                verbal = "I/O device write at LEDMCR with value " + bus_db + ". ";
                break;
            case LEDMCR_ID:
                var dr = get_value(sim.ep.states[s_expr[5]]);
                if (16 & bus_db) {
                    var x = (dr & 4278190080) >> 24;
                    var y = (dr & 16711680) >> 16;
                    var s = dr & 255;
                    verbal = "I/O device write at LEDMCR with value " + bus_db + " (set pixel x:" + x + ", y:" + y + ", with color:" + s + "). "
                }
                if (64 & bus_db) {
                    verbal = "I/O device write at LEDMCR with value " + bus_db + " (set color palette at:" + bus_db + "). "
                }
                break;
            default:
                break
        }
        return verbal
    }
};
sim.ep.behaviors.LEDM_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.ep.events.ledm = {};
        sim.ep.internal_states.ledm_colors = sim.ep.internal_states.color14.map((x => x));
        for (var i = 0; i < sim.ep.internal_states.ledm_state.length; i++) {
            set_var(sim.ep.internal_states.ledm_state[i].color, 1);
            set_var(sim.ep.internal_states.ledm_state[i].color, 0)
        }
        var n = Math.pow(sim.ep.internal_states.ledm_dim, 2);
        var o = "0".repeat(n);
        sim.ep.internal_states.ledm_frame = o;
        simcore_rest_call("LEDM", "POST", "/", {
            frame: o
        })
    },
    verbal: function(s_expr) {
        return "Reset the I/O device. "
    }
};
sim.ep.behaviors.LEDM_SYNC = {
    nparameters: 1,
    operation: function(s_expr) {
        var ledmstates = sim.ep.internal_states.ledm_state;
        var o = "";
        var p = 0;
        for (var j = 0; j < sim.ep.internal_states.ledm_dim; j++) {
            for (var k = 0; k < sim.ep.internal_states.ledm_dim; k++) {
                p = j * sim.ep.internal_states.ledm_dim + k;
                o = o + get_var(ledmstates[p].color).toString(16)
            }
        }
        if (sim.ep.internal_states.ledm_frame != o) {
            sim.ep.internal_states.ledm_frame = o;
            simcore_rest_call("LEDM", "POST", "/", {
                frame: o
            })
        }
    },
    verbal: function(s_expr) {
        return "Sync State with Device. "
    }
};
sim.ep.elements.ledm = {
    name: "LEDM",
    description: "3D Led Cube",
    type: "subcomponent",
    belongs: "LEDM",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "LEDM_IOR"
        },
        iow: {
            ref: "LEDM_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
var poc_def = {
    sim_name: "Proof-Of-Concept Processor",
    sim_short_name: "poc",
    sim_img_processor: "examples/hardware/poc/images/processor.svg",
    sim_img_controlunit: "examples/hardware/poc/images/controlunit.svg",
    sim_img_cpu: "examples/hardware/poc/images/cpu.svg",
    components: {},
    states: {},
    signals: {},
    behaviors: {},
    elements: {},
    internal_states: {},
    ctrl_states: {},
    events: {}
};
simhw_add(poc_def);
sim.poc.behaviors.PRINT_S = {
    nparameters: 2,
    types: ["S"],
    operation: function(s_expr) {
        console.log(s_expr[1] + ": 0x" + sim.poc.signals[s_expr[1]].value.toString(16))
    },
    verbal: function(s_expr) {
        return "Print value of signal " + s_expr[1] + ": 0x" + sim.poc.signals[s_expr[1]].value.toString(16) + ". "
    }
};
sim.poc.behaviors.PRINT_E = {
    nparameters: 2,
    types: ["E"],
    operation: function(s_expr) {
        console.log(s_expr[1] + ": 0x" + sim.poc.states[s_expr[1]].value.toString(16))
    },
    verbal: function(s_expr) {
        return "Print value of state " + s_expr[1] + ": 0x" + sim.poc.states[s_expr[1]].value.toString(16) + ". "
    }
};
sim.poc.components["CPU"] = {
    name: "CPU",
    version: "1",
    abilities: ["CPU"],
    details_name: ["REGISTER_FILE", "CONTROL_MEMORY", "CLOCK", "CPU_STATS"],
    details_fire: [
        ["svg_p:text3495", "svg_p:text3029", "svg_p:text3031"],
        ["svg_cu:text3010"],
        ["svg_p:text3459-7", "svg_cu:text4138", "svg_cu:text4138-7", "svg_cu:tspan4140-2"],
        ["svg_p:text3495"]
    ],
    write_state: function(vec) {
        if (typeof vec.CPU == "undefined") {
            vec.CPU = {}
        }
        var internal_reg = ["PC", "SR"];
        var value = 0;
        for (var i = 0; i < sim.poc.states.BR.length; i++) {
            value = parseInt(get_value(sim.poc.states.BR[i])) >>> 0;
            if (value != 0) {
                vec.CPU["R" + i] = {
                    type: "register",
                    default_value: 0,
                    id: "R" + i,
                    op: "=",
                    value: "0x" + value.toString(16)
                }
            }
        }
        for (var i = 0; i < internal_reg.length; i++) {
            value = parseInt(sim.poc.states["REG_" + internal_reg[i]].value) >>> 0;
            if (value != 0) {
                vec.CPU[internal_reg[i]] = {
                    type: "register",
                    default_value: 0,
                    id: internal_reg[i],
                    op: "=",
                    value: "0x" + value.toString(16)
                }
            }
        }
        return vec
    },
    read_state: function(vec, check) {
        if (typeof vec.CPU == "undefined") vec.CPU = {};
        var key = check["id"].toUpperCase().trim();
        var val = parseInt(check["value"]).toString(16);
        if ("REGISTER" == check["type"].toUpperCase().trim()) {
            vec.CPU[key] = {
                type: "register",
                default_value: 0,
                id: key,
                op: check["condition"],
                value: "0x" + val
            };
            return true
        }
        return false
    },
    get_state: function(reg) {
        var r_reg = reg.toUpperCase().trim();
        if (typeof sim.poc.states["REG_" + r_reg] != "undefined") {
            var value = get_value(sim.poc.states["REG_" + r_reg]) >>> 0;
            return "0x" + value.toString(16)
        }
        r_reg = r_reg.replace("R", "");
        var index = parseInt(r_reg);
        if (typeof sim.poc.states.BR[index] != "undefined") {
            var value = get_value(sim.poc.states.BR[index]) >>> 0;
            return "0x" + value.toString(16)
        }
        return null
    },
    get_value: function(elto) {
        if (Number.isInteger(elto)) index = elto;
        else index = parseInt(elto);
        if (isNaN(index)) return get_value(simhw_sim_state(elto)) >>> 0;
        return get_value(simhw_sim_states().BR[index]) >>> 0
    },
    set_value: function(elto, value) {
        var pc_name = simhw_sim_ctrlStates_get().pc.state;
        if (Number.isInteger(elto)) index = elto;
        else index = parseInt(elto);
        if (isNaN(index)) {
            set_value(simhw_sim_state(elto), value);
            if (pc_name === elto) {
                show_asmdbg_pc()
            }
            return value
        }
        return set_value(simhw_sim_states().BR[index], value)
    }
};
sim.poc.ctrl_states.pc = {
    name: "PC",
    state: "REG_PC",
    is_pointer: true
};
sim.poc.ctrl_states.sp = {
    name: "SP",
    state: "BR.29",
    is_pointer: true
};
sim.poc.ctrl_states.fp = {
    name: "FP",
    state: "BR.30",
    is_pointer: true
};
sim.poc.ctrl_states.ir = {
    name: "IR",
    state: "REG_IR",
    default_eltos: {
        co: {
            begin: 0,
            end: 5,
            length: 6
        },
        cop: {
            begin: 27,
            end: 31,
            length: 5
        }
    },
    is_pointer: false
};
sim.poc.ctrl_states.mpc = {
    name: "mPC",
    state: "REG_MICROADDR",
    is_pointer: false
};
sim.poc.internal_states.MC = {};
sim.poc.internal_states.ROM = {};
sim.poc.internal_states.FIRMWARE = ws_empty_firmware;
sim.poc.internal_states.io_hash = {};
sim.poc.internal_states.fire_stack = [];
sim.poc.internal_states.tri_state_names = ["T1", "T2", "T3", "T6", "T8", "T9", "T10", "T11", "T12"];
sim.poc.internal_states.fire_visible = {
    databus: false,
    internalbus: false
};
sim.poc.internal_states.filter_states = ["REG_IR_DECO,col-12", "REG_IR,col-auto", "REG_PC,col-auto", "REG_SR,col-auto", "REG_RT1,col-auto", "REG_MAR,col-auto", "REG_MBR,col-auto", "REG_MICROADDR,col-auto"];
sim.poc.internal_states.filter_signals = ["A0,0", "B,0", "C,0", "SELA,5", "SELB,5", "SELC,2", "SELCOP,0", "MR,0", "MC,0", "C0,0", "C1,0", "C2,0", "C3,0", "C4,0", "C7,0", "T1,0", "T2,0", "T3,0", "T6,0", "T8,0", "T9,0", "T10,0", "T11,0", "M1,0", "M7,0", "MA,0", "MB,0", "LC,0", "SE,0", "SIZE,0", "OFFSET,0", "BW,0", "R,0", "W,0", "TA,0", "TD,0", "IOR,0", "IOW,0", "TEST_I,0", "TEST_U,0"];
sim.poc.internal_states.alu_flags = {
    flag_n: 0,
    flag_z: 0,
    flag_v: 0,
    flag_c: 0
};
sim.poc.states.BR = [];
sim.poc.states.BR[0] = {
    name: "R0",
    verbal: "Register  0",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[1] = {
    name: "R1",
    verbal: "Register  1",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[2] = {
    name: "R2",
    verbal: "Register  2",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[3] = {
    name: "R3",
    verbal: "Register  3",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[4] = {
    name: "R4",
    verbal: "Register  4",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[5] = {
    name: "R5",
    verbal: "Register  5",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[6] = {
    name: "R6",
    verbal: "Register  6",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[7] = {
    name: "R7",
    verbal: "Register  7",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[8] = {
    name: "R8",
    verbal: "Register  8",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[9] = {
    name: "R9",
    verbal: "Register  9",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[10] = {
    name: "R10",
    verbal: "Register 10",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[11] = {
    name: "R11",
    verbal: "Register 11",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[12] = {
    name: "R12",
    verbal: "Register 12",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[13] = {
    name: "R13",
    verbal: "Register 13",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[14] = {
    name: "R14",
    verbal: "Register 14",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[15] = {
    name: "R15",
    verbal: "Register 15",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[16] = {
    name: "R16",
    verbal: "Register 16",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[17] = {
    name: "R17",
    verbal: "Register 17",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[18] = {
    name: "R18",
    verbal: "Register 18",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[19] = {
    name: "R19",
    verbal: "Register 19",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[20] = {
    name: "R20",
    verbal: "Register 20",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[21] = {
    name: "R21",
    verbal: "Register 21",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[22] = {
    name: "R22",
    verbal: "Register 22",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[23] = {
    name: "R23",
    verbal: "Register 23",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[24] = {
    name: "R24",
    verbal: "Register 24",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[25] = {
    name: "R25",
    verbal: "Register 25",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[26] = {
    name: "R26",
    verbal: "Register 26",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[27] = {
    name: "R27",
    verbal: "Register 27",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[28] = {
    name: "R28",
    verbal: "Register 28",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[29] = {
    name: "R29",
    verbal: "Register 29",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[30] = {
    name: "R30",
    verbal: "Register 30",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[31] = {
    name: "R31",
    verbal: "Register 31",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[32] = {
    name: "R32",
    verbal: "Register 32",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[33] = {
    name: "R33",
    verbal: "Register 33",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[34] = {
    name: "R34",
    verbal: "Register 34",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[35] = {
    name: "R35",
    verbal: "Register 35",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[36] = {
    name: "R36",
    verbal: "Register 36",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[37] = {
    name: "R37",
    verbal: "Register 37",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[38] = {
    name: "R38",
    verbal: "Register 38",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[39] = {
    name: "R39",
    verbal: "Register 39",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[40] = {
    name: "R40",
    verbal: "Register 40",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[41] = {
    name: "R41",
    verbal: "Register 41",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[42] = {
    name: "R42",
    verbal: "Register 42",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[43] = {
    name: "R43",
    verbal: "Register 43",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[44] = {
    name: "R44",
    verbal: "Register 44",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[45] = {
    name: "R45",
    verbal: "Register 45",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[46] = {
    name: "R46",
    verbal: "Register 46",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[47] = {
    name: "R47",
    verbal: "Register 47",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[48] = {
    name: "R48",
    verbal: "Register 48",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[49] = {
    name: "R49",
    verbal: "Register 49",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[50] = {
    name: "R50",
    verbal: "Register 50",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[51] = {
    name: "R51",
    verbal: "Register 51",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[52] = {
    name: "R52",
    verbal: "Register 52",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[53] = {
    name: "R53",
    verbal: "Register 53",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[54] = {
    name: "R54",
    verbal: "Register 54",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[55] = {
    name: "R55",
    verbal: "Register 55",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[56] = {
    name: "R56",
    verbal: "Register 56",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[57] = {
    name: "R57",
    verbal: "Register 57",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[58] = {
    name: "R58",
    verbal: "Register 58",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[59] = {
    name: "R59",
    verbal: "Register 59",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[60] = {
    name: "R60",
    verbal: "Register 60",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[61] = {
    name: "R61",
    verbal: "Register 61",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[62] = {
    name: "R62",
    verbal: "Register 62",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.BR[63] = {
    name: "R63",
    verbal: "Register 63",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_PC"] = {
    name: "PC",
    verbal: "Program Counter Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_MAR"] = {
    name: "MAR",
    verbal: "Memory Address Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_MBR"] = {
    name: "MBR",
    verbal: "Memory Data Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_IR"] = {
    name: "IR",
    verbal: "Instruction Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_SR"] = {
    name: "SR",
    verbal: "State Register",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_RT1"] = {
    name: "RT1",
    verbal: "Temporal Register 1",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["BUS_IB"] = {
    name: "I_BUS",
    verbal: "Internal Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["BUS_AB"] = {
    name: "A_BUS",
    verbal: "Address Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["BUS_CB"] = {
    name: "C_BUS",
    verbal: "Control Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["BUS_DB"] = {
    name: "D_BUS",
    verbal: "Data Bus",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["RA_T9"] = {
    name: "RA_T9",
    verbal: "Input of T9 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["RB_T10"] = {
    name: "RB_T10",
    verbal: "Input of T10 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["HPC_T12"] = {
    name: "HPC_T12",
    verbal: "Input of T12 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["SELEC_T3"] = {
    name: "SELEC_T3",
    verbal: "Input of T3 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["ALU_T6"] = {
    name: "ALU_T6",
    verbal: "Input of T6 Tristate",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["MA_ALU"] = {
    name: "MA_ALU",
    verbal: "Input ALU via MA",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["MB_ALU"] = {
    name: "MB_ALU",
    verbal: "Input ALU via MB",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["FLAG_C"] = {
    name: "FLAG_C",
    verbal: "Carry Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["FLAG_V"] = {
    name: "FLAG_V",
    verbal: "Overflow Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["FLAG_N"] = {
    name: "FLAG_N",
    verbal: "Negative Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["FLAG_Z"] = {
    name: "FLAG_Z",
    verbal: "Zero Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["FLAG_I"] = {
    name: "FLAG_I",
    verbal: "Interruption Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["FLAG_U"] = {
    name: "FLAG_U",
    verbal: "User Flag",
    visible: true,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["REG_MICROADDR"] = {
    name: "µADDR",
    verbal: "Microaddress Register",
    visible: true,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: ["svg_cu:text4667"]
};
sim.poc.states["REG_MICROINS"] = {
    name: "µINS",
    verbal: "Microinstruction Register",
    visible: true,
    nbits: "77",
    value: {},
    default_value: {},
    draw_data: []
};
sim.poc.states["FETCH"] = {
    name: "FETCH",
    verbal: "Input Fetch",
    visible: false,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["ROM_MUXA"] = {
    name: "ROM_MUXA",
    verbal: "Input ROM",
    visible: false,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["SUM_ONE"] = {
    name: "SUM_ONE",
    verbal: "Input next microinstruction",
    visible: false,
    nbits: "12",
    value: 1,
    default_value: 1,
    draw_data: []
};
sim.poc.states["MUXA_MICROADDR"] = {
    name: "MUXA_MICROADDR",
    verbal: "Input microaddress",
    visible: false,
    nbits: "12",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["MUXC_MUXB"] = {
    name: "MUXC_MUXB",
    verbal: "Output of MUX C",
    visible: false,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["INEX"] = {
    name: "INEX",
    verbal: "Illegal Instruction Exception",
    visible: false,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["BS_M1"] = {
    name: "BS_M1",
    verbal: "from Memory",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["BS_TD"] = {
    name: "BS_TD",
    verbal: "Memory",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["INTV"] = {
    name: "INTV",
    verbal: "Interruption Vector",
    visible: false,
    nbits: "8",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["M1_C1"] = {
    name: "M1_C1",
    verbal: "Input of Memory Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["M7_C7"] = {
    name: "M7_C7",
    verbal: "Input of State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["VAL_ZERO"] = {
    name: "VAL_ZERO",
    verbal: "Wired Zero",
    visible: false,
    nbits: "1",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["VAL_ONE"] = {
    name: "VAL_ONE",
    verbal: "Wired One",
    visible: false,
    nbits: "32",
    value: 1,
    default_value: 1,
    draw_data: []
};
sim.poc.states["VAL_FOUR"] = {
    name: "VAL_FOUR",
    verbal: "Wired Four",
    visible: false,
    nbits: "32",
    value: 4,
    default_value: 4,
    draw_data: []
};
sim.poc.states["REG_IR_DECO"] = {
    name: "IR_DECO",
    verbal: "Instruction Decoded",
    visible: true,
    nbits: "0",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["DECO_INS"] = {
    name: "DECO_INS",
    verbal: "Instruction decoded in binary",
    visible: true,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["CLK"] = {
    name: "CLK",
    verbal: "Clock",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["ACC_TIME"] = {
    name: "ACC_TIME",
    verbal: "Accumulated CPU time",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["TTCPU"] = {
    name: "TTCPU",
    verbal: "Several Tristates to the internal data bus in CPU activated",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states["ACC_PWR"] = {
    name: "ACC_PWR",
    verbal: "Accumulated Energy Consumption",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.signals["C"] = {
    name: "C",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    behavior: ["MV MUXC_MUXB VAL_ZERO; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB INT 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB IORDY 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB MRDY 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB REG_SR 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB REG_SR 1 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB REG_SR 28 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB REG_SR 29 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB REG_SR 30 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MBIT MUXC_MUXB REG_SR 31 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB", "MV MUXC_MUXB INEX; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB"],
    fire_name: ["svg_cu:text3410"],
    draw_data: [
        ["svg_cu:path3108"],
        ["svg_cu:path3062"],
        ["svg_cu:path3060"],
        ["svg_cu:path3136"],
        ["svg_cu:path3482"],
        ["svg_cu:path3480"],
        ["svg_cu:path3488"],
        ["svg_cu:path3486"],
        ["svg_cu:path3484"],
        ["svg_cu:path3484-9"],
        ["svg_cu:path3108-3", "svg_cu:path3260-3-8-6", "svg_cu:path3260-3-8", "svg_cu:path3260-3"]
    ],
    draw_name: [
        ["svg_cu:path3496", "svg_cu:path3414", "svg_cu:path3194-08"]
    ]
};
sim.poc.signals["B"] = {
    name: "B",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV A1 MUXC_MUXB; FIRE A1", "NOT_ES A1 MUXC_MUXB; FIRE A1"],
    depends_on: ["CLK"],
    fire_name: ["svg_cu:text3408"],
    draw_data: [
        ["svg_cu:path3094-7"],
        ["svg_cu:path3392", "svg_cu:path3372", "svg_cu:path3390", "svg_cu:path3384", "svg_cu:path3108-1", "svg_cu:path3100-8-7"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3194-0", "svg_cu:path3138-8", "svg_cu:path3498-6"]
    ]
};
sim.poc.signals["A0"] = {
    name: "A0",
    visible: false,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["SBIT_SIGNAL A0A1 0 1; FIRE A0A1", "SBIT_SIGNAL A0A1 1 1; FIRE A0A1"],
    depends_on: ["CLK"],
    fire_name: ["svg_cu:text3406"],
    draw_data: [
        ["svg_cu:path3096"],
        ["svg_cu:path3096"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3138-8-1", "svg_cu:path3098-2", "svg_cu:path3124-2-5"]
    ]
};
sim.poc.signals["A1"] = {
    name: "A1",
    visible: false,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["SBIT_SIGNAL A0A1 0 0; FIRE A0A1", "SBIT_SIGNAL A0A1 1 0; FIRE A0A1"],
    depends_on: ["CLK"],
    fire_name: [],
    draw_data: [
        ["svg_cu:path3094"],
        ["svg_cu:path3094"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["A0A1"] = {
    name: "A0A1",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["PLUS1 MUXA_MICROADDR REG_MICROADDR", "CP_FIELD MUXA_MICROADDR REG_MICROINS/MADDR", "MV MUXA_MICROADDR ROM_MUXA", "MV MUXA_MICROADDR FETCH"],
    depends_on: ["CLK"],
    fire_name: [],
    draw_data: [
        ["svg_cu:path3102", "svg_cu:path3100", "svg_cu:path3098", "svg_cu:path3100-9", "svg_cu:path3088"],
        ["svg_cu:path3104", "svg_cu:path3134", "svg_cu:path3500", "svg_cu:path3416"],
        ["svg_cu:path3504", "svg_cu:path3100-8", "svg_cu:path3234-9"],
        ["svg_cu:path3124"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["C0"] = {
    name: "C0",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV REG_MAR BUS_IB"],
    fire_name: ["svg_p:text3077"],
    draw_data: [
        ["svg_p:path3081"]
    ],
    draw_name: [
        ["svg_p:path3075"]
    ]
};
sim.poc.signals["C1"] = {
    name: "C1",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV REG_MBR M1_C1"],
    fire_name: ["svg_p:text3079"],
    draw_data: [
        ["svg_p:path3055"]
    ],
    draw_name: [
        ["svg_p:path3073"]
    ]
};
sim.poc.signals["C2"] = {
    name: "C2",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV REG_PC BUS_IB; UPDATEDPC"],
    fire_name: ["svg_p:text3179"],
    draw_data: [
        ["svg_p:path3217"]
    ],
    draw_name: [
        ["svg_p:path3177"]
    ]
};
sim.poc.signals["C3"] = {
    name: "C3",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV REG_IR BUS_IB; DECO; FIRE_IFSET C 10"],
    fire_name: ["svg_p:text3439"],
    draw_data: [
        ["svg_p:path3339", "svg_p:path3913-4"]
    ],
    draw_name: [
        ["svg_p:path3337"]
    ]
};
sim.poc.signals["C4"] = {
    name: "C4",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV REG_RT1 BUS_IB"],
    fire_name: ["svg_p:tspan482"],
    draw_data: [
        ["svg_p:path3339-4"]
    ],
    draw_name: [
        ["svg_p:path3337-0"]
    ]
};
sim.poc.signals["C7"] = {
    name: "C7",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV REG_SR M7_C7"],
    fire_name: ["svg_p:text3655"],
    draw_data: [
        ["svg_p:path3651-9"]
    ],
    draw_name: [
        ["svg_p:path3681"]
    ]
};
sim.poc.signals["TA"] = {
    name: "TA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MV BUS_AB REG_MAR"],
    fire_name: ["svg_p:text3091"],
    draw_data: [
        ["svg_p:path3089", "svg_p:path3597", "svg_p:path3513", "svg_p:path3601", "svg_p:path3601-2", "svg_p:path3187", "svg_p:path3087", "svg_p:path2995", "svg_p:path3535"]
    ],
    draw_name: [
        ["svg_p:path3085"]
    ]
};
sim.poc.signals["TD"] = {
    name: "TD",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; CHECK_RTD", "MV BUS_DB REG_MBR; FIRE R; FIRE W; CHECK_RTD"],
    fire_name: ["svg_p:text3103"],
    draw_data: [
        ["svg_p:path3101", "svg_p:path3587", "svg_p:path3419-8", "svg_p:path3071", "svg_p:path3099", "svg_p:path3097", "svg_p:path3559-5", "svg_p:path3419-1-0", "svg_p:path3583", "svg_p:path3419-1", "svg_p:path3491", "svg_p:path3641", "svg_p:path3541"]
    ],
    draw_name: [
        ["svg_p:path3095"]
    ]
};
sim.poc.signals["T1"] = {
    name: "T1",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 0", "MV BUS_IB REG_MBR; FIRE M7; FIRE M1; SET_TT TTCPU 0"],
    fire_name: ["svg_p:text3105"],
    draw_data: [
        ["svg_p:path3071", "svg_p:path3069", "svg_p:path3049", "svg_p:path3063-9", "svg_p:path3071"]
    ],
    draw_name: [
        ["svg_p:path3067"]
    ]
};
sim.poc.signals["T2"] = {
    name: "T2",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 1", "MV BUS_IB REG_PC; FIRE M7; FIRE M1; SET_TT TTCPU 1"],
    fire_name: ["svg_p:text3449"],
    draw_data: [
        ["svg_p:path3199", "svg_p:path3201", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3329"]
    ]
};
sim.poc.signals["T3"] = {
    name: "T3",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 2", "MV BUS_IB SELEC_T3; FIRE M7; FIRE M1; SET_TT TTCPU 2"],
    fire_name: ["svg_p:text3451"],
    draw_data: [
        ["svg_p:path3349", "svg_p:path3931", "svg_p:path3345", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3351"]
    ]
};
sim.poc.signals["T6"] = {
    name: "T6",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 3", "MV BUS_IB ALU_T6; FIRE M7; FIRE M1; SET_TT TTCPU 3"],
    fire_name: ["svg_p:text3457"],
    draw_data: [
        ["svg_p:path3589", "svg_p:path3317", "svg_p:path3163-2", "svg_p:path3049", "svg_p:path3317-9", "svg_p:path3321", "svg_p:path3261-8"]
    ],
    draw_name: [
        ["svg_p:path3319"]
    ]
};
sim.poc.signals["T8"] = {
    name: "T8",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 4", "MV BUS_IB REG_SR; FIRE M7; FIRE M1; SET_TT TTCPU 4"],
    fire_name: ["svg_p:text3657"],
    draw_data: [
        ["svg_p:path3651", "svg_p:path3647", "svg_p:path3049"]
    ],
    draw_name: [
        ["svg_p:path3649"]
    ]
};
sim.poc.signals["T9"] = {
    name: "T9",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 5", "MV BUS_IB RA_T9; FIRE M7; FIRE M1; SET_TT TTCPU 5"],
    fire_name: ["svg_p:text3147"],
    draw_data: [
        ["svg_p:path3143", "svg_p:path3139", "svg_p:path3049", "svg_p:path3143-9"]
    ],
    draw_name: [
        ["svg_p:path3133"]
    ]
};
sim.poc.signals["T10"] = {
    name: "T10",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 6", "MV BUS_IB RB_T10; FIRE M7; FIRE M1; SET_TT TTCPU 6"],
    fire_name: ["svg_p:text3149"],
    draw_data: [
        ["svg_p:path3145", "svg_p:path3141", "svg_p:path3049", "svg_p:path3145-5"]
    ],
    draw_name: [
        ["svg_p:path3137"]
    ]
};
sim.poc.signals["T11"] = {
    name: "T11",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 7", "CP_FIELD BUS_IB REG_MICROINS/EXCODE; FIRE M7; FIRE M1; SET_TT TTCPU 7"],
    fire_name: ["svg_p:text3147-5", "svg_cu:tspan4426"],
    draw_data: [
        ["svg_p:path3081-3", "svg_p:path3139-7", "svg_p:path3049", "svg_cu:path3081-3", "svg_cu:path3139-7", "svg_cu:path3502"]
    ],
    draw_name: [
        ["svg_p:path3133-6", "svg_cu:path3133-6"]
    ]
};
sim.poc.signals["T12"] = {
    name: "T12",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; RST_TT TTCPU 8", "MV BUS_IB HPC_T12; FIRE M7; FIRE M1; SET_TT TTCPU 8"],
    fire_name: ["svg_p:text3147-5-0-1-1"],
    draw_data: [
        ["svg_p:path3139-7-1-4-3", "svg_cu:path3049"]
    ],
    draw_name: [
        ["svg_cu:path3133-6-9-7-5"]
    ]
};
sim.poc.signals["M1"] = {
    name: "M1",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV M1_C1 BUS_IB", "MV M1_C1 BUS_DB"],
    depends_on: ["C1"],
    fire_name: ["svg_p:text3469"],
    draw_data: [
        ["svg_p:path3063", "svg_p:path3061", "svg_p:path3059"],
        ["svg_p:path3057", "svg_p:path3641", "svg_p:path3419", "svg_p:path3583"]
    ],
    draw_name: [
        [],
        ["svg_p:path3447"]
    ]
};
sim.poc.signals["M7"] = {
    name: "M7",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV M7_C7 BUS_IB", "MV M7_C7 REG_SR; UPDATE_FLAG M7_C7 FLAG_C 31; UPDATE_FLAG M7_C7 FLAG_V 30; UPDATE_FLAG M7_C7 FLAG_N 29; UPDATE_FLAG M7_C7 FLAG_Z 28"],
    depends_on: ["C7"],
    fire_name: ["svg_p:text3673"],
    draw_data: [
        ["svg_p:path3691", "svg_p:path3693", "svg_p:path3659"],
        ["svg_p:path3695"]
    ],
    draw_name: [
        [],
        ["svg_p:path3667"]
    ]
};
sim.poc.signals["MA"] = {
    name: "MA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV MA_ALU RA_T9; FIRE COP", "MV MA_ALU BUS_IB; FIRE COP"],
    depends_on: ["SELA", "SELB"],
    fire_name: ["svg_p:text3463"],
    draw_data: [
        ["svg_p:path3249", "svg_p:path3161", "svg_p:path3165"],
        ["svg_p:path3279"]
    ],
    draw_name: [
        [],
        ["svg_p:path3423"]
    ]
};
sim.poc.signals["MB"] = {
    name: "MB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV MB_ALU RB_T10; FIRE COP", "MV MB_ALU REG_PC; FIRE COP"],
    depends_on: ["SELA", "SELB"],
    fire_name: ["svg_p:text3465"],
    draw_data: [
        ["svg_p:path3281", "svg_p:path3171", "svg_p:path3169"],
        ["svg_p:path3283"]
    ],
    draw_name: [
        [],
        ["svg_p:path3425", "svg_p:path3427"]
    ]
};
sim.poc.signals["MH"] = {
    name: "MH",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["MV HPC_T12 CLK", "MV HPC_T12 ACC_TIME", "MV HPC_T12 ACC_PWR", "NOP"],
    fire_name: ["svg_p:text3147-5-0-1-8-4"],
    draw_data: [
        [],
        ["svg_p:path3081-3-8-5-3"]
    ],
    draw_name: [
        [],
        ["svg_p:path3306-8-7-6"]
    ]
};
sim.poc.signals["COP"] = {
    name: "COP",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    forbidden: true,
    behavior: ["NOP_ALU; UPDATE_NZVC", "AND ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "OR ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "NOT ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "XOR ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "SRL ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "SRA ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "SL ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "RR ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "RL ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "ADD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "SUB ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "MUL ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "DIV ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "MOD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "LUI ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "ADDFOUR ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "ADDONE ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "SUBFOUR ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "SUBONE ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "FADD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "FSUB ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "FMUL ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "FDIV ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "FMOD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1", "NOP_ALU", "NOP_ALU", "NOP_ALU", "NOP_ALU", "NOP_ALU", "NOP_ALU", "NOP_ALU"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_p:text3303"],
    draw_data: [
        ["svg_p:path3237", "svg_p:path3239", "svg_p:path3261-8", "svg_p:path3321", "svg_p:path3901-6", "svg_p:path3317-9"]
    ],
    draw_name: [
        ["svg_p:path3009", "svg_p:path3301"]
    ]
};
sim.poc.signals["SELA"] = {
    name: "SELA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "6",
    behavior: ["FIRE_IFCHANGED MRA SELA; RESET_CHANGED SELA"],
    depends_on: ["RA"],
    fire_name: ["svg_cu:text3164"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["SELB"] = {
    name: "SELB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "6",
    behavior: ["FIRE_IFCHANGED MRB SELB; RESET_CHANGED SELB"],
    depends_on: ["RB"],
    fire_name: ["svg_cu:text3168"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["SELC"] = {
    name: "SELC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "6",
    behavior: ["FIRE_IFCHANGED MRC SELC; RESET_CHANGED SELC"],
    depends_on: ["RC"],
    fire_name: ["svg_cu:text3172"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["SELCOP"] = {
    name: "SELCOP",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["FIRE_IFCHANGED MC SELCOP; RESET_CHANGED SELCOP"],
    depends_on: ["COP"],
    fire_name: ["svg_cu:text3312"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["EXCODE"] = {
    name: "EXCODE",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "4",
    behavior: ["FIRE T11"],
    fire_name: ["svg_cu:text3312-6"],
    draw_data: [
        []
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["RA"] = {
    name: "RA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "6",
    forbidden: true,
    behavior: ["GET RA_T9 BR RA; FIRE_IFSET T9 1; FIRE_IFSET MA 0"],
    depends_on: ["SELA"],
    fire_name: ["svg_p:text3107"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3109"]
    ]
};
sim.poc.signals["RB"] = {
    name: "RB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "6",
    forbidden: true,
    behavior: ["GET RB_T10 BR RB; FIRE_IFSET T10 1; FIRE_IFSET MB 0"],
    depends_on: ["SELB"],
    fire_name: ["svg_p:text3123"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3113"]
    ]
};
sim.poc.signals["RC"] = {
    name: "RC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "6",
    forbidden: true,
    behavior: ["FIRE LC"],
    depends_on: ["SELC"],
    fire_name: ["svg_p:text3125"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3117"]
    ]
};
sim.poc.signals["LC"] = {
    name: "LC",
    visible: true,
    type: "E",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "SET BR RC BUS_IB"],
    fire_name: ["svg_p:text3127"],
    draw_data: [
        ["svg_p:path3153", "svg_p:path3151", "svg_p:path3129"]
    ],
    draw_name: [
        ["svg_p:path3121"]
    ]
};
sim.poc.signals["SE"] = {
    name: "SE",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3", "MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3"],
    depends_on: ["T3"],
    fire_name: ["svg_p:text3593"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3591", "svg_p:path3447-7-7"]
    ]
};
sim.poc.signals["SIZE"] = {
    name: "SIZE",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3"],
    depends_on: ["T3"],
    fire_name: ["svg_p:text3363"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3355"]
    ]
};
sim.poc.signals["OFFSET"] = {
    name: "OFFSET",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "5",
    behavior: ["MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3"],
    depends_on: ["T3"],
    fire_name: ["svg_p:text3707"],
    draw_data: [
        []
    ],
    draw_name: [
        ["svg_p:path3359"]
    ]
};
sim.poc.signals["MC"] = {
    name: "MC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT COP REG_IR 0 5; FIRE_IFCHANGED COP MC", "CP_FIELD COP REG_MICROINS/SELCOP; FIRE_IFCHANGED COP MC"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_cu:text3322", "svg_cu:text3172-1-5"],
    draw_data: [
        ["svg_cu:path3320", "svg_cu:path3142"],
        ["svg_cu:path3318", "svg_cu:path3502-6", "svg_cu:path3232-6"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3306"]
    ]
};
sim.poc.signals["MRA"] = {
    name: "MRA",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT_SN RA REG_IR REG_MICROINS/SELA 5; FIRE RA;", "CP_FIELD RA REG_MICROINS/SELA; FIRE RA;"],
    depends_on: ["SELA"],
    fire_name: ["svg_cu:text3222"],
    draw_data: [
        ["svg_cu:path3494", "svg_cu:path3492", "svg_cu:path3490", "svg_cu:path3142b", "svg_cu:path3188", "svg_cu:path3190", "svg_cu:path3192", "svg_cu:path3194", "svg_cu:path3276", "svg_cu:path3290", "svg_cu:path3260"],
        ["svg_cu:path3270", "svg_cu:path3258", "svg_cu:path3260", "svg_cu:path3294", "svg_cu:path3288", "svg_cu:path3280"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3220"]
    ]
};
sim.poc.signals["MRB"] = {
    name: "MRB",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT_SN RB REG_IR REG_MICROINS/SELB 5; FIRE RB;", "CP_FIELD RB REG_MICROINS/SELB; FIRE RB;"],
    depends_on: ["SELB"],
    fire_name: ["svg_cu:text3242"],
    draw_data: [
        ["svg_cu:path3196", "svg_cu:path3278", "svg_cu:path3292"],
        ["svg_cu:path3282", "svg_cu:path3258-4", "svg_cu:path3278", "svg_cu:path3196"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3240"]
    ]
};
sim.poc.signals["MRC"] = {
    name: "MRC",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MBIT_SN RC REG_IR REG_MICROINS/SELC 5; FIRE RC;", "CP_FIELD RC REG_MICROINS/SELC; FIRE RC;"],
    depends_on: ["SELC"],
    fire_name: ["svg_cu:text3254"],
    draw_data: [
        ["svg_cu:path3494", "svg_cu:path3492", "svg_cu:path3490", "svg_cu:path3142b", "svg_cu:path3188", "svg_cu:path3190", "svg_cu:path3192", "svg_cu:path3194", "svg_cu:path3276", "svg_cu:path3290", "svg_cu:path3232", "svg_cu:path3292"],
        ["svg_cu:path3300", "svg_cu:path3294", "svg_cu:path3292", "svg_cu:path3288", "svg_cu:path3232"]
    ],
    draw_name: [
        [],
        ["svg_cu:path3252"]
    ]
};
sim.poc.signals["IOR"] = {
    name: "IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MOVE_BITS SCR_IOR 0 1 IOR; FIRE SCR_IOR; MOVE_BITS IO_IOR 0 1 IOR; FIRE IO_IOR; MOVE_BITS L3D_IOR 0 1 IOR; FIRE L3D_IOR; MOVE_BITS KBD_IOR 0 1 IOR; FIRE KBD_IOR; MOVE_BITS LEDM_IOR 0 1 IOR; FIRE LEDM_IOR"],
    fire_name: [],
    draw_data: [
        [],
        ["svg_p:path3733", "svg_p:path3491", "svg_p:text3715"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals["IOW"] = {
    name: "IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MOVE_BITS SCR_IOW 0 1 IOW; FIRE SCR_IOW; MOVE_BITS IO_IOW 0 1 IOW; FIRE IO_IOW; MOVE_BITS L3D_IOW 0 1 IOW; FIRE L3D_IOW; MOVE_BITS LEDM_IOW 0 1 IOW; FIRE LEDM_IOW"],
    fire_name: [],
    draw_data: [
        [],
        ["svg_p:path3735", "svg_p:path3491", "svg_p:text3717"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals["TEST_C"] = {
    name: "TEST_C",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_C VAL_ZERO; FIRE M7", "MV FLAG_C VAL_ONE; FIRE M7"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_p:text3701-3"],
    draw_data: [
        ["svg_p:text3701-3"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["TEST_V"] = {
    name: "TEST_V",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_V VAL_ZERO; FIRE M7", "MV FLAG_V VAL_ONE; FIRE M7"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_p:text3701-3-1"],
    draw_data: [
        ["svg_p:text3701-3-1"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["TEST_N"] = {
    name: "TEST_N",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_N VAL_ZERO; FIRE M7", "MV FLAG_N VAL_ONE; FIRE M7"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_p:text3701-3-2"],
    draw_data: [
        ["svg_p:text3701-3-2"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["TEST_Z"] = {
    name: "TEST_Z",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    forbidden: true,
    behavior: ["MV FLAG_Z VAL_ZERO; FIRE M7", "MV FLAG_Z VAL_ONE; FIRE M7"],
    depends_on: ["SELCOP"],
    fire_name: ["svg_p:text3701-3-5"],
    draw_data: [
        ["svg_p:text3701-3-5"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["TEST_I"] = {
    name: "TEST_I",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV FLAG_I VAL_ZERO; FIRE M7", "MV FLAG_I VAL_ONE; FIRE M7"],
    depends_on: ["CLK"],
    fire_name: ["svg_cu:text3440"],
    draw_data: [
        ["svg_cu:text3440"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["TEST_U"] = {
    name: "TEST_U",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["MV FLAG_U VAL_ZERO; FIRE M7", "MV FLAG_U VAL_ONE; FIRE M7"],
    depends_on: ["CLK"],
    fire_name: ["svg_cu:text3442"],
    draw_data: [
        ["svg_cu:text3442"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.signals["TEST_INTV"] = {
    name: "TEST_INTV",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "8",
    forbidden: true,
    behavior: ["MBIT INTV TEST_INTV 0 32"],
    depends_on: ["INT"],
    fire_name: ["svg_p:tspan4225"],
    draw_data: [
        ["svg_p:path3749"]
    ],
    draw_name: [
        []
    ]
};
sim.poc.behaviors["NOP"] = {
    nparameters: 1,
    operation: function(s_expr) {},
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["NOP_ALU"] = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.internal_states.alu_flags.flag_n = 0;
        sim.poc.internal_states.alu_flags.flag_z = 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        return "Reset ALU flags. "
    }
};
sim.poc.behaviors["MV"] = {
    nparameters: 3,
    types: ["X", "X"],
    operation: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        newval = get_value(sim_elto_org);
        set_value(sim_elto_dst, newval)
    },
    verbal: function(s_expr) {
        var sim_elto_org = get_reference(s_expr[2]);
        var newval = get_value(sim_elto_org);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "short") {
            return "Copy from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(newval) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " (" + show_value(newval) + "). "
    }
};
sim.poc.behaviors["LOAD"] = {
    nparameters: 3,
    types: ["X", "X"],
    operation: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        newval = get_value(sim_elto_org);
        set_value(sim_elto_dst, newval)
    },
    verbal: function(s_expr) {
        var sim_elto_org = get_reference(s_expr[2]);
        var newval = get_value(sim_elto_org);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Load from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(newval) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_value(newval) + " ( " + show_verbal(s_expr[2]) + "). "
    }
};
sim.poc.behaviors["CP_FIELD"] = {
    nparameters: 3,
    types: ["X", "X"],
    operation: function(s_expr) {
        r = s_expr[2].split("/");
        sim_elto_org = get_reference(r[0]);
        newval = get_value(sim_elto_org);
        newval = newval[r[1]];
        if (typeof newval != "undefined") {
            sim_elto_dst = get_reference(s_expr[1]);
            set_value(sim_elto_dst, newval)
        }
    },
    verbal: function(s_expr) {
        var r = s_expr[2].split("/");
        var sim_elto_org = get_reference(r[0]);
        var newval = get_value(sim_elto_org);
        newval = newval[r[1]];
        if (typeof newval == "undefined") newval = "&lt;undefined&gt;";
        else newval = show_value(newval);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return 'Copy from "' + show_verbal(r[0]) + '"[' + r[1] + "] " + "to " + show_verbal(s_expr[1]) + " (value " + newval + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(r[0]) + "." + r[1] + " (" + newval + "). "
    }
};
sim.poc.behaviors["NOT_ES"] = {
    nparameters: 3,
    types: ["S", "E"],
    operation: function(s_expr) {
        set_value(sim.poc.signals[s_expr[1]], Math.abs(get_value(sim.poc.states[s_expr[2]]) - 1))
    },
    verbal: function(s_expr) {
        var value = Math.abs(get_value(sim.poc.states[s_expr[2]]) - 1);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Logical NOT of " + s_expr[2] + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_value(value) + " (Logical NOT " + s_expr[2] + "). "
    }
};
sim.poc.behaviors["GET"] = {
    nparameters: 4,
    types: ["E", "E", "S"],
    operation: function(s_expr) {
        set_value(sim.poc.states[s_expr[1]], get_value(sim.poc.states[s_expr[2]][sim.poc.signals[s_expr[3]].value]))
    },
    verbal: function(s_expr) {
        var value = get_value(sim.poc.states[s_expr[2]][sim.poc.signals[s_expr[3]].value]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Register File " + s_expr[3] + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_value(value) + " (Register File " + s_expr[3] + "). "
    }
};
sim.poc.behaviors["SET"] = {
    nparameters: 4,
    types: ["E", "S", "E"],
    operation: function(s_expr) {
        set_value(sim.poc.states[s_expr[1]][sim.poc.signals[s_expr[2]].value], get_value(sim.poc.states[s_expr[3]]))
    },
    verbal: function(s_expr) {
        var value = get_value(sim.poc.states[s_expr[3]]);
        var o_ref = sim.poc.states[s_expr[1]][sim.poc.signals[s_expr[2]].value];
        var o_verbal = o_ref.name;
        if (typeof o_ref.verbal != "undefined") o_verbal = o_ref.verbal;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy to " + o_verbal + " the value " + show_value(value) + ". "
        }
        return o_verbal + " = " + show_value(value) + ". "
    }
};
sim.poc.behaviors["AND"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) & get_value(sim.poc.states[s_expr[3]]);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) & get_value(sim.poc.states[s_expr[3]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU AND with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (AND). "
    }
};
sim.poc.behaviors["OR"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) | get_value(sim.poc.states[s_expr[3]]);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) | get_value(sim.poc.states[s_expr[3]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU OR with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (OR). "
    }
};
sim.poc.behaviors["NOT"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = ~get_value(sim.poc.states[s_expr[2]]);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = ~get_value(sim.poc.states[s_expr[2]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU NOT with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (NOT). "
    }
};
sim.poc.behaviors["XOR"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) ^ get_value(sim.poc.states[s_expr[3]]);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) ^ get_value(sim.poc.states[s_expr[3]]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU XOR with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (XOR). "
    }
};
sim.poc.behaviors["SRL"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) >>> 1;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) >>> 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Shift Right Logical with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SRL). "
    }
};
sim.poc.behaviors["SRA"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) >> 1;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) >> 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Shift Right Arithmetic with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SRA). "
    }
};
sim.poc.behaviors["SL"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 1;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Shift Left with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SL). "
    }
};
sim.poc.behaviors["RR"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) >>> 1 | (get_value(sim.poc.states[s_expr[2]]) & 1) << 31;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) >>> 1 | (get_value(sim.poc.states[s_expr[2]]) & 1) << 31;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Right Rotation with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (RR). "
    }
};
sim.poc.behaviors["RL"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 1 | (get_value(sim.poc.states[s_expr[2]]) & 2147483648) >>> 31;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 1 | (get_value(sim.poc.states[s_expr[2]]) & 2147483648) >>> 31;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Left Rotation with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (LR). "
    }
};
sim.poc.behaviors["ADD"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a + b;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a + b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU ADD with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (ADD). "
    }
};
sim.poc.behaviors["SUB"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a - b;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a - b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU SUB with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (SUB). "
    }
};
sim.poc.behaviors["MUL"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a * b;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a * b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU MUL with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (MUL). "
    }
};
sim.poc.behaviors["DIV"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        if (0 == b) {
            set_value(sim.poc.states[s_expr[1]], 0);
            sim.poc.internal_states.alu_flags.flag_n = 0;
            sim.poc.internal_states.alu_flags.flag_z = 1;
            sim.poc.internal_states.alu_flags.flag_v = 1;
            sim.poc.internal_states.alu_flags.flag_c = 0;
            return
        }
        var result = Math.floor(a / b);
        set_value(sim.poc.states[s_expr[1]], result);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        if (0 == b) {
            return "ALU DIV zero by zero (oops!). "
        }
        var result = Math.floor(a / b);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU DIV with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (DIV). "
    }
};
sim.poc.behaviors["MOD"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        if (0 == b) {
            set_value(sim.poc.states[s_expr[1]], 0);
            sim.poc.internal_states.alu_flags.flag_n = 0;
            sim.poc.internal_states.alu_flags.flag_z = 1;
            sim.poc.internal_states.alu_flags.flag_v = 1;
            sim.poc.internal_states.alu_flags.flag_c = 0;
            return
        }
        var result = a % b;
        set_value(sim.poc.states[s_expr[1]], result);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        if (0 == b) {
            return "ALU MOD zero by zero (oops!). "
        }
        var result = a % b;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU MOD with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (MOD). "
    }
};
sim.poc.behaviors["LUI"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 16;
        set_value(sim.poc.states[s_expr[1]], result);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 16;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "ALU Load Upper Immediate with result " + show_value(result) + ". "
        }
        return "ALU output = " + show_value(result) + " (LUI). "
    }
};
sim.poc.behaviors["ADDFOUR"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 4;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 4;
        return "ALU ADD 4 with result " + show_value(result) + ". "
    }
};
sim.poc.behaviors["ADDONE"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 1;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 1;
        return "ALU ADD 1 with result " + show_value(result) + ". "
    }
};
sim.poc.behaviors["SUBFOUR"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a - 4;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a - 4;
        return "ALU SUB 4 with result " + show_value(result) + ". "
    }
};
sim.poc.behaviors["SUBONE"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a - 1;
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = a >>> 31 && b >>> 31;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a - 1;
        return "ALU SUB 1 with result " + show_value(result) + ". "
    }
};
sim.poc.behaviors["FADD"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) + b.toFixed(2);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) + b.toFixed(2);
        return "ALU Float ADD with result " + result + ". "
    }
};
sim.poc.behaviors["FSUB"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) - b.toFixed(2);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) - b.toFixed(2);
        return "ALU Float SUB with result " + result + ". "
    }
};
sim.poc.behaviors["FMUL"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) * b.toFixed(2);
        set_value(sim.poc.states[s_expr[1]], result >>> 0);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_c = 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        if (result < 0 && a >= 0 && b >= 0) sim.poc.internal_states.alu_flags.flag_v = 1;
        if (result >= 0 && a < 0 && b < 0) sim.poc.internal_states.alu_flags.flag_v = 1
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) * b.toFixed(2);
        return "ALU Float MUL with result " + result + ". "
    }
};
sim.poc.behaviors["FDIV"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        if (0 == b) {
            set_value(sim.poc.states[s_expr[1]], 0);
            sim.poc.internal_states.alu_flags.flag_n = 0;
            sim.poc.internal_states.alu_flags.flag_z = 1;
            sim.poc.internal_states.alu_flags.flag_v = 1;
            sim.poc.internal_states.alu_flags.flag_c = 0;
            return
        }
        var result = Math.floor(a / b);
        set_value(sim.poc.states[s_expr[1]], result);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) / b.toFixed(2);
        return "ALU Float DIV with result " + result + ". "
    }
};
sim.poc.behaviors["FMOD"] = {
    nparameters: 4,
    types: ["E", "E", "E"],
    operation: function(s_expr) {
        var result = (get_value(sim.poc.states[s_expr[2]]) << 0) % (get_value(sim.poc.states[s_expr[3]]) << 0);
        set_value(sim.poc.states[s_expr[1]], result);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var b = get_value(sim.poc.states[s_expr[3]]) << 0;
        var result = a.toFixed(2) % b.toFixed(2);
        return "ALU Float MOD with result " + result + ". "
    }
};
sim.poc.behaviors["LUI"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 16;
        set_value(sim.poc.states[s_expr[1]], result);
        sim.poc.internal_states.alu_flags.flag_n = result < 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_z = result == 0 ? 1 : 0;
        sim.poc.internal_states.alu_flags.flag_v = 0;
        sim.poc.internal_states.alu_flags.flag_c = 0
    },
    verbal: function(s_expr) {
        var result = get_value(sim.poc.states[s_expr[2]]) << 16;
        return "ALU Load Upper Immediate with result " + show_value(result) + ". "
    }
};
sim.poc.behaviors["PLUS1"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 1;
        set_value(sim.poc.states[s_expr[1]], result >>> 0)
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 1;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Add one to " + show_verbal(s_expr[2]) + " and copy to " + show_verbal(s_expr[1]) + " with result " + show_value(result) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " + 1" + " (" + show_value(result) + "). "
    }
};
sim.poc.behaviors["PLUS4"] = {
    nparameters: 3,
    types: ["E", "E"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 4;
        set_value(sim.poc.states[s_expr[1]], result >>> 0)
    },
    verbal: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[2]]) << 0;
        var result = a + 4;
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Add four to " + show_verbal(s_expr[2]) + " and copy to " + show_verbal(s_expr[1]) + " with result " + show_value(result) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " + 4" + " (" + show_value(result) + "). "
    }
};
sim.poc.behaviors["SET_TT"] = {
    nparameters: 3,
    types: ["E", "I"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[1]]) << 0;
        var b = parseInt(s_expr[2]);
        var m = Math.pow(2, b);
        var r = a | m;
        set_value(sim.poc.states[s_expr[1]], r);
        update_cpu_bus_fire(r, b)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["RST_TT"] = {
    nparameters: 3,
    types: ["E", "I"],
    operation: function(s_expr) {
        var a = get_value(sim.poc.states[s_expr[1]]) << 0;
        var b = parseInt(s_expr[2]);
        var m = Math.pow(2, b);
        var r = a & ~m;
        set_value(sim.poc.states[s_expr[1]], r);
        update_cpu_bus_fire(r, b)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["CHECK_RTD"] = {
    nparameters: 1,
    operation: function(s_expr) {
        var number_active_tri = parseInt(simhw_sim_signal("TD").value) + parseInt(simhw_sim_signal("R").value);
        update_system_bus_fire(number_active_tri)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["MBIT"] = {
    nparameters: 5,
    types: ["X", "X", "I", "I"],
    operation: function(s_expr) {
        var sim_elto_dst = get_reference(s_expr[1]);
        var sim_elto_org = get_reference(s_expr[2]);
        var offset = parseInt(s_expr[3]);
        var size = parseInt(s_expr[4]);
        var n1 = get_value(sim_elto_org).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        set_value(sim_elto_dst, parseInt(n2, 2))
    },
    verbal: function(s_expr) {
        var sim_elto_dst = get_reference(s_expr[1]);
        var sim_elto_org = get_reference(s_expr[2]);
        var offset = parseInt(s_expr[3]);
        var size = parseInt(s_expr[4]);
        var n1 = get_value(sim_elto_org).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        var n3 = parseInt(n2, 2);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n3) + " (copied " + size + " bits from bit " + offset + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[2]) + " (" + show_value(n3) + ", " + size + " bits from bit " + offset + "). "
    }
};
sim.poc.behaviors["MBIT_SN"] = {
    nparameters: 5,
    types: ["S", "E", "E", "I"],
    operation: function(s_expr) {
        var base = 0;
        var r = s_expr[3].split("/");
        if (1 == r.length) base = get_value(sim.poc.states[s_expr[3]]);
        else if (typeof sim.poc.states[r[0]].value[r[1]] != "undefined") base = sim.poc.states[r[0]].value[r[1]];
        else if (typeof sim.poc.signals[r[1]].default_value != "undefined") base = sim.poc.signals[r[1]].default_value;
        else if (typeof sim.poc.states[r[1]].default_value != "undefined") base = sim.poc.states[r[1]].default_value;
        else ws_alert("WARN: undefined state/field pair -> " + r[0] + "/" + r[1]);
        var offset = parseInt(s_expr[4]);
        var n1 = get_value(sim.poc.states[s_expr[2]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - (base + offset - 1), offset);
        set_value(sim.poc.signals[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        var base = 0;
        var r = s_expr[3].split("/");
        if (1 == r.length) base = get_value(sim.poc.states[s_expr[3]]);
        else if (typeof sim.poc.states[r[0]].value[r[1]] != "undefined") base = sim.poc.states[r[0]].value[r[1]];
        else if (typeof sim.poc.signals[r[1]].default_value != "undefined") base = sim.poc.signals[r[1]].default_value;
        else if (typeof sim.poc.states[r[1]].default_value != "undefined") base = sim.poc.states[r[1]].default_value;
        else ws_alert("WARN: undefined state/field pair -> " + r[0] + "/" + r[1]);
        var offset = parseInt(s_expr[4]);
        var n1 = get_value(sim.poc.states[s_expr[2]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - (base + offset - 1), offset);
        var from_elto = "";
        if (1 == r.length) from_elto = show_verbal(s_expr[3]);
        else from_elto = '"' + show_verbal(s_expr[2]) + '"[' + r[1] + "] ";
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + from_elto + "into " + show_verbal(s_expr[1]) + " " + "value " + parseInt(n3, 2) + ". "
        }
        return show_verbal(s_expr[1]) + " = " + from_elto + " (" + parseInt(n3, 2) + "). "
    }
};
sim.poc.behaviors["SBIT_SIGNAL"] = {
    nparameters: 4,
    types: ["X", "I", "I"],
    operation: function(s_expr) {
        sim_elto_dst = get_reference(s_expr[1]);
        var new_value = sim_elto_dst.value;
        var mask = 1 << s_expr[3];
        if (s_expr[2] == "1") new_value = new_value | mask;
        else new_value = new_value & ~mask;
        set_value(sim_elto_dst, new_value >>> 0)
    },
    verbal: function(s_expr) {
        sim_elto_dst = get_reference(s_expr[1]);
        var new_value = sim_elto_dst.value;
        var mask = 1 << s_expr[3];
        if (s_expr[2] == "1") new_value = new_value | mask;
        else new_value = new_value & ~mask;
        return compute_signal_verbals(s_expr[1], new_value >>> 0)
    }
};
sim.poc.behaviors["UPDATE_FLAG"] = {
    nparameters: 4,
    types: ["X", "X", "I"],
    operation: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        var new_value = sim_elto_dst.value & ~(1 << s_expr[3]) | sim_elto_org.value << s_expr[3];
        set_value(sim_elto_dst, new_value >>> 0)
    },
    verbal: function(s_expr) {
        sim_elto_org = get_reference(s_expr[2]);
        sim_elto_dst = get_reference(s_expr[1]);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Update " + show_verbal(s_expr[2]) + " to value " + sim_elto_org.value + ". "
        }
        return show_verbal(s_expr[1]) + "." + show_verbal(s_expr[3]) + " = " + sim_elto_org.value + ". "
    }
};
sim.poc.behaviors["MBITS"] = {
    nparameters: 8,
    types: ["E", "I", "E", "S", "S", "I", "S"],
    operation: function(s_expr) {
        var offset = parseInt(sim.poc.signals[s_expr[4]].value);
        var size = parseInt(sim.poc.signals[s_expr[5]].value);
        var n1 = get_value(sim.poc.states[s_expr[3]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        if ("1" == sim.poc.signals[s_expr[7]].value && "1" == n2.substr(0, 1)) {
            n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2
        }
        set_value(sim.poc.states[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        var offset = parseInt(sim.poc.signals[s_expr[4]].value);
        var size = parseInt(sim.poc.signals[s_expr[5]].value);
        var n1 = get_value(sim.poc.states[s_expr[3]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (offset + size - 1), size);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        if ("1" == sim.poc.signals[s_expr[7]].value && "1" == n2.substr(0, 1)) {
            n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2
        }
        n1 = parseInt(n3, 2);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return " Copy from " + show_verbal(s_expr[3]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n1) + " (copied " + size + " bits from bit " + offset + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[3]) + " (" + show_value(n1) + ", " + size + " bits from bit " + offset + "). "
    }
};
sim.poc.behaviors["BSEL"] = {
    nparameters: 6,
    types: ["E", "I", "I", "E", "I"],
    operation: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var poso = parseInt(s_expr[5]);
        var len = parseInt(s_expr[3]);
        var n1 = get_value(sim.poc.states[s_expr[4]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (poso + len) + 1, len);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var n4 = "00000000000000000000000000000000".substr(0, posd);
        n3 = n3 + n4;
        set_value(sim.poc.states[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var len = parseInt(s_expr[3]);
        var poso = parseInt(s_expr[5]);
        var n1 = get_value(sim.poc.states[s_expr[4]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n2 = n2.substr(31 - (poso + len) + 1, len);
        var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var n4 = "00000000000000000000000000000000".substr(0, posd);
        n3 = n3 + n4;
        var n5 = parseInt(n3, 2);
        var verbose = get_cfg("verbal_verbose");
        if (verbose !== "math") {
            return "Copy from " + show_verbal(s_expr[4]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n5) + " (copied " + len + " bits, from bit " + poso + " of " + s_expr[4] + " to bit " + posd + " of " + s_expr[1] + "). "
        }
        return show_verbal(s_expr[1]) + " = " + show_verbal(s_expr[4]) + " (" + show_value(n5) + ", " + len + " bits, from bit " + poso + " of " + s_expr[4] + " to bit " + posd + " of " + s_expr[1] + "). "
    }
};
sim.poc.behaviors["EXT_SIG"] = {
    nparameters: 3,
    types: ["E", "I"],
    operation: function(s_expr) {
        var n1 = get_value(sim.poc.states[s_expr[1]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - s_expr[2], 31);
        var n4 = n3;
        if ("1" == n2[31 - s_expr[2]]) {
            n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4
        }
        set_value(sim.poc.states[s_expr[1]], parseInt(n4, 2))
    },
    verbal: function(s_expr) {
        var n1 = get_value(sim.poc.states[s_expr[1]]).toString(2);
        var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        var n3 = n2.substr(31 - s_expr[2], 31);
        var n4 = n3;
        if ("1" == n2[31 - s_expr[2]]) {
            n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4
        }
        var n5 = parseInt(n4, 2);
        return "Sign Extension with value " + show_value(n5) + ". "
    }
};
sim.poc.behaviors["MOVE_BITS"] = {
    nparameters: 5,
    types: ["S", "I", "I", "S"],
    operation: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var poso = 0;
        var len = parseInt(s_expr[3]);
        var n1 = sim.poc.signals[s_expr[4]].value.toString(2);
        n1 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n1 = n1.substr(31 - poso - len + 1, len);
        var n2 = sim.poc.signals[s_expr[1]].value.toString(2);
        n2 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var m1 = n2.substr(0, 32 - (posd + len));
        var m2 = n2.substr(31 - posd + 1, posd);
        var n3 = m1 + n1 + m2;
        set_value(sim.poc.signals[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["MOVE_BITSE"] = {
    nparameters: 6,
    types: ["S", "I", "I", "E", "I"],
    operation: function(s_expr) {
        var posd = parseInt(s_expr[2]);
        var poso = parseInt(s_expr[5]);
        var len = parseInt(s_expr[3]);
        var n1 = get_value(sim.poc.states[s_expr[4]]).toString(2);
        n1 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
        n1 = n1.substr(31 - poso - len + 1, len);
        var n2 = sim.poc.signals[s_expr[1]].value.toString(2);
        n2 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
        var m1 = n2.substr(0, 32 - (posd + len));
        var m2 = n2.substr(31 - posd + 1, posd);
        var n3 = m1 + n1 + m2;
        set_value(sim.poc.signals[s_expr[1]], parseInt(n3, 2))
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["DECO"] = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.states["INEX"].value = 0;
        var oi = decode_instruction(sim.poc.internal_states.FIRMWARE, sim.poc.ctrl_states.ir, get_value(sim.poc.states["REG_IR"]));
        if (null == oi.oinstruction) {
            ws_alert("ERROR: undefined instruction code in IR (" + "co:" + oi.op_code.toString(2) + ", " + "cop:" + oi.cop_code.toString(2) + ")");
            sim.poc.states["ROM_MUXA"].value = 0;
            sim.poc.states["INEX"].value = 1;
            return -1
        }
        var rom_addr = oi.op_code << 6;
        if (typeof oi.oinstruction.cop != "undefined") {
            rom_addr = rom_addr + oi.cop_code
        }
        if (typeof sim.poc.internal_states["ROM"][rom_addr] == "undefined") {
            ws_alert("ERROR: undefined rom address " + rom_addr + " in firmware");
            sim.poc.states["ROM_MUXA"].value = 0;
            return -1
        }
        sim.poc.states["ROM_MUXA"].value = sim.poc.internal_states["ROM"][rom_addr];
        var val = get_value(sim.poc.states["DECO_INS"]);
        set_value(sim.poc.states["DECO_INS"], val + 1);
        var pc = get_value(sim.poc.states["REG_PC"]) - 4;
        var decins = get_deco_from_pc(pc);
        set_value(sim.poc.states["REG_IR_DECO"], decins);
        show_dbg_ir(get_value(sim.poc.states["REG_IR_DECO"]))
    },
    verbal: function(s_expr) {
        return "Decode instruction. "
    }
};
sim.poc.behaviors["FIRE"] = {
    nparameters: 2,
    types: ["S"],
    operation: function(s_expr) {
        if (sim.poc.internal_states.fire_stack.indexOf(s_expr[1]) != -1) {
            return
        }
        sim.poc.internal_states.fire_stack.push(s_expr[1]);
        update_draw(sim.poc.signals[s_expr[1]], sim.poc.signals[s_expr[1]].value);
        if ("L" == sim.poc.signals[s_expr[1]].type) {
            update_state(s_expr[1])
        }
        sim.poc.internal_states.fire_stack.pop(s_expr[1])
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["FIRE_IFSET"] = {
    nparameters: 3,
    types: ["S", "I"],
    operation: function(s_expr) {
        if (get_value(sim.poc.signals[s_expr[1]]) != parseInt(s_expr[2])) {
            return
        }
        sim.poc.behaviors["FIRE"].operation(s_expr)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["FIRE_IFCHANGED"] = {
    nparameters: 3,
    types: ["S", "X"],
    operation: function(s_expr) {
        sim_elto = get_reference(s_expr[2]);
        if (sim_elto.changed == false) return;
        sim.poc.behaviors["FIRE"].operation(s_expr)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["RESET_CHANGED"] = {
    nparameters: 2,
    types: ["X"],
    operation: function(s_expr) {
        sim_elto = get_reference(s_expr[1]);
        sim_elto.changed = false
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["CLOCK"] = {
    nparameters: 1,
    operation: function(s_expr) {
        var new_maddr = null;
        var mcelto = null;
        var t0 = performance.now();
        var val = get_value(sim.poc.states["CLK"]);
        set_value(sim.poc.states["CLK"], val + 1);
        set_value(sim.poc.states["TTCPU"], 0);
        new_maddr = get_value(sim.poc.states["REG_MICROADDR"]);
        mcelto = sim.poc.internal_states["MC"][new_maddr];
        if (typeof mcelto !== "undefined" && false == mcelto.is_native) {
            for (var i = 0; i < jit_fire_order.length; i++) {
                fn_updateE_now(jit_fire_order[i])
            }
        }
        new_maddr = get_value(sim.poc.states["MUXA_MICROADDR"]);
        set_value(sim.poc.states["REG_MICROADDR"], new_maddr);
        mcelto = sim.poc.internal_states["MC"][new_maddr];
        if (typeof mcelto === "undefined") {
            mcelto = {
                value: sim.poc.states["REG_MICROINS"].default_value,
                is_native: false
            }
        }
        var new_mins = Object.create(get_value(mcelto));
        sim.poc.states["REG_MICROINS"].value = new_mins;
        for (var key in sim.poc.signals) {
            if (typeof new_mins[key] !== "undefined") set_value(sim.poc.signals[key], new_mins[key]);
            else set_value(sim.poc.signals[key], sim.poc.signals[key].default_value)
        }
        if (mcelto.is_native) {
            if (typeof mcelto.NATIVE_JIT != "undefined") mcelto.NATIVE_JIT();
            else if (typeof mcelto.NATIVE != "undefined") eval(mcelto.NATIVE)
        } else {
            for (var i = 0; i < jit_fire_order.length; i++) {
                fn_updateL_now(jit_fire_order[i])
            }
        }
        var t1 = performance.now();
        var val = get_value(sim.poc.states["ACC_TIME"]);
        val = val + (t1 - t0);
        set_value(sim.poc.states["ACC_TIME"], val);
        val = Math.trunc(16 * val);
        set_value(sim.poc.states["ACC_PWR"], val)
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["CPU_RESET"] = {
    nparameters: 1,
    operation: function(s_expr) {
        for (var key in sim.poc.states) {
            reset_value(sim.poc.states[key])
        }
        for (var key in sim.poc.signals) {
            reset_value(sim.poc.signals[key])
        }
    },
    verbal: function(s_expr) {
        return "Reset CPU. "
    }
};
sim.poc.behaviors["UPDATEDPC"] = {
    nparameters: 1,
    operation: function(s_expr) {
        show_asmdbg_pc()
    },
    verbal: function(s_expr) {
        return ""
    }
};
sim.poc.behaviors["UPDATE_NZVC"] = {
    nparameters: 1,
    operation: function(s_expr) {
        set_value(simhw_sim_state("FLAG_N"), sim.poc.internal_states.alu_flags.flag_n);
        set_value(simhw_sim_state("FLAG_Z"), sim.poc.internal_states.alu_flags.flag_z);
        set_value(simhw_sim_state("FLAG_V"), sim.poc.internal_states.alu_flags.flag_v);
        set_value(simhw_sim_state("FLAG_C"), sim.poc.internal_states.alu_flags.flag_c);
        set_value(simhw_sim_signal("TEST_N"), sim.poc.internal_states.alu_flags.flag_n);
        set_value(simhw_sim_signal("TEST_Z"), sim.poc.internal_states.alu_flags.flag_z);
        set_value(simhw_sim_signal("TEST_V"), sim.poc.internal_states.alu_flags.flag_v);
        set_value(simhw_sim_signal("TEST_C"), sim.poc.internal_states.alu_flags.flag_c);
        update_draw(sim.poc.signals["TEST_N"], sim.poc.signals["TEST_N"].value);
        update_draw(sim.poc.signals["TEST_Z"], sim.poc.signals["TEST_Z"].value);
        update_draw(sim.poc.signals["TEST_V"], sim.poc.signals["TEST_V"].value);
        update_draw(sim.poc.signals["TEST_C"], sim.poc.signals["TEST_C"].value)
    },
    verbal: function(s_expr) {
        return "Update flags N-Z-V-C."
    }
};
sim.poc.elements.cpu_t1 = {
    name: "T1",
    description: "Tristate 1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MBR"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T1"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t2 = {
    name: "T2",
    description: "Tristate 2",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_PC"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T2"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t3 = {
    name: "T3",
    description: "Tristate 3",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "SELEC_T3"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T3"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t6 = {
    name: "T6",
    description: "Tristate 6",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "ALU_C6"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T6"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t8 = {
    name: "T8",
    description: "Tristate 8",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_SR"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T8"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t9 = {
    name: "T9",
    description: "Tristate 9",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "RA_T9"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T9"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t10 = {
    name: "T10",
    description: "Tristate 10",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "RB_T10"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T10"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t11 = {
    name: "T11",
    description: "Tristate 11",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MICROINS"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T11"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_t12 = {
    name: "T12",
    description: "Tristate 12",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "HPC_T12"
        },
        out: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ctl: {
            ref: "T12"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_ta = {
    name: "Ta",
    description: "Tristate A",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MAR"
        },
        out: {
            ref: "BUS_AB"
        }
    },
    signals: {
        ctl: {
            ref: "TA"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_tb = {
    name: "Td",
    description: "Tristate D",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "REG_MBR"
        },
        out: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ctl: {
            ref: "TD"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cpu_mux_a = {
    name: "MUX A",
    description: "MUX A",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "RA_T9"
        },
        mux_1: {
            ref: "BUS_IB"
        },
        mux_o: {
            ref: "MA_ALU"
        }
    },
    signals: {
        ma: {
            ref: "MA"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ma"],
    signals_output: []
};
sim.poc.elements.cpu_mux_b = {
    name: "MUX B",
    description: "MUX B",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "RB_T10"
        },
        mux_1: {
            ref: "REG_PC"
        },
        mux_o: {
            ref: "MB_ALU"
        }
    },
    signals: {
        mb: {
            ref: "MB"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mb"],
    signals_output: []
};
sim.poc.elements.cpu_mux_1 = {
    name: "MUX 1",
    description: "MUX 1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "BUS_IB"
        },
        mux_1: {
            ref: "BUS_DB"
        },
        mux_o: {
            ref: "M1_C1"
        }
    },
    signals: {
        m1: {
            ref: "M1"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["m1"],
    signals_output: []
};
sim.poc.elements.cpu_mux_7 = {
    name: "MUX 7",
    description: "MUX 7",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "BUS_IB"
        },
        mux_1: {
            ref: "SELP_M7"
        },
        mux_o: {
            ref: "M7_C7"
        }
    },
    signals: {
        m7: {
            ref: "M7"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["m7"],
    signals_output: []
};
sim.poc.elements.cpu_mux_h = {
    name: "MUX H",
    description: "MUX H",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "CLK"
        },
        mux_1: {
            ref: "ACC_TIME"
        },
        mux_2: {
            ref: "ACC_PWR"
        },
        mux_3: {
            ref: "VAL_ZERO"
        },
        mux_o: {
            ref: "HPC_T12"
        }
    },
    signals: {
        mh: {
            ref: "MH"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mh"],
    signals_output: []
};
sim.poc.elements.cu_mux_a = {
    name: "MUX A",
    description: "MUX A",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_MICROADDR"
        },
        mux_1: {
            ref: "REG_MICROINS"
        },
        mux_2: {
            ref: "ROM_MUXA"
        },
        mux_3: {
            ref: "FETCH"
        },
        mux_o: {
            ref: "MUXA_MICROADDR"
        }
    },
    signals: {
        a0: {
            ref: "A0A1"
        },
        a1: {
            ref: "A0A1"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3"],
    states_outputs: ["mux_o"],
    signals_inputs: ["a0", "a1"],
    signals_output: []
};
sim.poc.elements.cu_mux_b = {
    name: "MUX B",
    description: "MUX B",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "MUXC_MUXB"
        },
        mux_1: {
            ref: "MUXC_MUXB"
        },
        mux_o: {
            ref: "A1"
        }
    },
    signals: {
        mb: {
            ref: "B"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mb"],
    signals_output: []
};
sim.poc.elements.cu_mux_c = {
    name: "MUX C",
    description: "MUX C",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "VAL_ZERO"
        },
        mux_1: {
            ref: "INT"
        },
        mux_2: {
            ref: "IORDY"
        },
        mux_3: {
            ref: "MRDY"
        },
        mux_4: {
            ref: "REG_SR/0"
        },
        mux_5: {
            ref: "REG_SR/1"
        },
        mux_6: {
            ref: "REG_SR/28"
        },
        mux_7: {
            ref: "REG_SR/29"
        },
        mux_8: {
            ref: "REG_SR/30"
        },
        mux_9: {
            ref: "REG_SR/31"
        },
        mux_10: {
            ref: "INEX"
        },
        mux_o: {
            ref: "MUXC_MUXB"
        }
    },
    signals: {
        ctl: {
            ref: "C"
        }
    },
    states_inputs: ["mux_0", "mux_1", "mux_2", "mux_3", "mux_4", "mux_5", "mux_6", "mux_7", "mux_8", "mux_9", "mux_10"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cu_mux_ra = {
    name: "MUX RA",
    description: "MUX MR",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELA"
        },
        mux_o: {
            ref: "RA"
        }
    },
    signals: {
        ctl: {
            ref: "MRA"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.cu_mux_rb = {
    name: "MUX RB",
    description: "MUX MR",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELB"
        },
        mux_o: {
            ref: "RB"
        }
    },
    signals: {
        mr: {
            ref: "MRB"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mr"],
    signals_output: []
};
sim.poc.elements.cu_mux_rc = {
    name: "MUX RC",
    description: "MUX MR",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELC"
        },
        mux_o: {
            ref: "RC"
        }
    },
    signals: {
        mr: {
            ref: "MRC"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["mr"],
    signals_output: []
};
sim.poc.elements.cu_mux_mc = {
    name: "MUX MC",
    description: "MUX MC",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_0: {
            ref: "REG_IR"
        },
        mux_1: {
            ref: "REG_MICROINS/SELCOP"
        },
        mux_o: {
            ref: "COP"
        }
    },
    signals: {
        ctl: {
            ref: "MC"
        }
    },
    states_inputs: ["mux_0", "mux_1"],
    states_outputs: ["mux_o"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.mar = {
    name: "MAR",
    description: "Memory Address Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_MAR"
        }
    },
    signals: {
        c0: {
            ref: "C0"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["c0"],
    signals_output: []
};
sim.poc.elements.mbr = {
    name: "MBR",
    description: "Memory Data Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "M1_C1"
        },
        out: {
            ref: "REG_MBR"
        }
    },
    signals: {
        c1: {
            ref: "C1"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["c1"],
    signals_output: []
};
sim.poc.elements.pc = {
    name: "PC",
    description: "Programm Counter",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_PC"
        }
    },
    signals: {
        ctl: {
            ref: "C2"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.ir = {
    name: "IR",
    description: "Instruction Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_IR"
        }
    },
    signals: {
        c3: {
            ref: "C3"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["c3"],
    signals_output: []
};
sim.poc.elements.rt1 = {
    name: "RT1",
    description: "Temporal Register 1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "BUS_IB"
        },
        out: {
            ref: "REG_RT1"
        }
    },
    signals: {
        ctl: {
            ref: "C4"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.sr = {
    name: "SR",
    description: "State Register",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        in: {
            ref: "M7_C7"
        },
        out: {
            ref: "REG_SR"
        }
    },
    signals: {
        ctl: {
            ref: "C7"
        }
    },
    states_inputs: ["in"],
    states_outputs: ["out"],
    signals_inputs: ["ctl"],
    signals_output: []
};
sim.poc.elements.register_file = {
    name: "RF",
    description: "Register File",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        a: {
            ref: "RA_T9"
        },
        b: {
            ref: "RB_T10"
        },
        c: {
            ref: "BUS_IB"
        }
    },
    signals: {
        ra: {
            ref: "RA"
        },
        rb: {
            ref: "RB"
        },
        rc: {
            ref: "RC"
        },
        lc: {
            ref: "LC"
        }
    },
    states_inputs: ["c"],
    states_outputs: ["a", "b"],
    signals_inputs: ["ra", "rb", "rc", "lc"],
    signals_output: []
};
sim.poc.elements.cpu_alu = {
    name: "ALU",
    description: "Arithmetic-Logit Unit",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        a: {
            ref: "MA_ALU"
        },
        b: {
            ref: "MB_ALU"
        },
        alu: {
            ref: "ALU_C6"
        },
        flags: {
            ref: "M7"
        }
    },
    signals: {
        cop: {
            ref: "COP"
        }
    },
    states_inputs: ["a", "b"],
    states_outputs: ["alu", "flags"],
    signals_inputs: ["cop"],
    signals_output: []
};
sim.poc.elements.select_rt1 = {
    name: "Sel-RT1",
    description: "Select RT1",
    type: "subcomponent",
    belongs: "CPU",
    states: {
        mux_i: {
            ref: "REG_RT1"
        },
        mux_o: {
            ref: "SELEC_T3"
        }
    },
    signals: {
        se: {
            ref: "SE"
        },
        size: {
            ref: "SIZE"
        },
        offset: {
            ref: "OFFSET"
        }
    },
    states_inputs: ["mux_i"],
    states_outputs: ["mux_o"],
    signals_inputs: ["se", "size", "offset"],
    signals_output: []
};
sim.poc.components.MEMORY = {
    name: "MEMORY",
    version: "1",
    abilities: ["MEMORY"],
    details_name: ["MEMORY", "MEMORY_CONFIG"],
    details_fire: [
        ["svg_p:text3001"],
        []
    ],
    write_state: function(vec) {
        if (typeof vec.MEMORY == "undefined") vec.MEMORY = {};
        var key = 0;
        var value = 0;
        for (var index in sim.poc.internal_states.MP) {
            value = main_memory_getvalue(sim.poc.internal_states.MP, index);
            value = parseInt(value);
            if (value != 0) {
                key = parseInt(index).toString(16);
                vec.MEMORY["0x" + key] = {
                    type: "memory",
                    default_value: 0,
                    id: "0x" + key,
                    op: "=",
                    value: "0x" + value.toString(16)
                }
            }
        }
        return vec
    },
    read_state: function(vec, check) {
        if (typeof vec.MEMORY == "undefined") {
            vec.MEMORY = {}
        }
        var key = parseInt(check.id).toString(16);
        var val = parseInt(check.value).toString(16);
        if ("MEMORY" == check.type.toUpperCase().trim()) {
            vec.MEMORY["0x" + key] = {
                type: "memory",
                default_value: 0,
                id: "0x" + key,
                op: check.condition,
                value: "0x" + val
            };
            return true
        }
        return false
    },
    get_state: function(pos) {
        var index = parseInt(pos);
        var value = main_memory_getvalue(sim.poc.internal_states.MP, index);
        if (typeof value === "undefined") {
            return null
        }
        return "0x" + parseInt(value).toString(16)
    },
    get_value: function(elto) {
        var value = main_memory_getvalue(sim.poc.internal_states.MP, elto);
        show_main_memory(sim.poc.internal_states.MP, elto, false, false);
        return value >>> 0
    },
    set_value: function(elto, value) {
        var origin = "";
        var r_value = main_memory_get_program_counter();
        if (r_value != null) {
            origin = "PC=0x" + r_value.toString(16)
        }
        var melto = {
            value: value >>> 0,
            source_tracking: [origin],
            comments: null
        };
        var valref = main_memory_set(sim.poc.internal_states.MP, elto, melto);
        show_main_memory(sim.poc.internal_states.MP, elto, typeof valref === "undefined", true);
        return value
    }
};
sim.poc.internal_states.segments = {};
sim.poc.internal_states.MP = {};
sim.poc.internal_states.MP_wc = 0;
sim.poc.signals.MRDY = {
    name: "MRDY",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    depends_on: ["CLK"],
    behavior: ["FIRE_IFCHANGED MRDY C", "FIRE_IFCHANGED MRDY C"],
    fire_name: ["svg_p:tspan3916"],
    draw_data: [
        [],
        ["svg_p:path3895", "svg_p:path3541"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.R = {
    name: "R",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP; CHECK_RTD", "MEM_READ BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY; CHECK_RTD"],
    fire_name: ["svg_p:text3533-5-2"],
    draw_data: [
        [],
        ["svg_p:path3557", "svg_p:path3571"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.W = {
    name: "W",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "MEM_WRITE BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY"],
    fire_name: ["svg_p:text3533-5-08"],
    draw_data: [
        [],
        ["svg_p:path3559", "svg_p:path3575", "svg_p:path3447-7"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.BW = {
    name: "BW",
    verbal: ["Access to one byte from memory. ", "Access to two bytes from memory. ", "Access to three bytes from memory. ", "Access to a word from memory. "],
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "2",
    behavior: ["FIRE R; FIRE W", "FIRE R; FIRE W", "FIRE R; FIRE W", "FIRE R; FIRE W"],
    fire_name: ["svg_p:text3533-5-2-8"],
    draw_data: [
        ["svg_p:path3557-0"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.behaviors.MEM_READ = {
    nparameters: 6,
    types: ["E", "E", "S", "S", "E"],
    operation: function(s_expr) {
        var address = sim.poc.states[s_expr[1]].value;
        var dbvalue = sim.poc.states[s_expr[2]].value;
        var bw = sim.poc.signals[s_expr[3]].value;
        var clk = get_value(sim.poc.states[s_expr[5]].value);
        sim.poc.signals[s_expr[4]].value = 0;
        var remain = get_var(sim.poc.internal_states.MP_wc);
        if (typeof sim.poc.events.mem[clk - 1] != "undefined" && sim.poc.events.mem[clk - 1] > 0) {
            remain = sim.poc.events.mem[clk - 1] - 1
        }
        sim.poc.events.mem[clk] = remain;
        if (remain > 0) {
            return
        }
        var wordress = address & 4294967292;
        var value = main_memory_getvalue(sim.poc.internal_states.MP, wordress);
        var full_redraw = false;
        if (typeof value === "undefined") {
            value = 0;
            full_redraw = true
        }
        dbvalue = main_memory_extractvalues(value, bw, address & 3);
        sim.poc.states[s_expr[2]].value = dbvalue >>> 0;
        sim.poc.signals[s_expr[4]].value = 1;
        show_main_memory(sim.poc.internal_states.MP, wordress, full_redraw, false)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var address = sim.poc.states[s_expr[1]].value;
        var dbvalue = sim.poc.states[s_expr[2]].value;
        var bw = sim.poc.signals[s_expr[3]].value;
        var clk = get_value(sim.poc.states[s_expr[5]].value);
        switch (bw) {
            case 0:
                bw_type = "byte";
                break;
            case 1:
                bw_type = "half";
                break;
            case 2:
                bw_type = "three bytes";
                break;
            case 3:
                bw_type = "word";
                break
        }
        var value = main_memory_getvalue(sim.poc.internal_states.MP, address);
        if (typeof value === "undefined") {
            value = 0
        }
        verbal = "Try to read a " + bw_type + " from memory " + "at address 0x" + address.toString(16) + " with value " + value.toString(16) + ". ";
        return verbal
    }
};
sim.poc.behaviors.MEM_WRITE = {
    nparameters: 6,
    types: ["E", "E", "S", "S", "E"],
    operation: function(s_expr) {
        var address = sim.poc.states[s_expr[1]].value;
        var dbvalue = sim.poc.states[s_expr[2]].value;
        var bw = sim.poc.signals[s_expr[3]].value;
        var clk = get_value(sim.poc.states[s_expr[5]].value);
        sim.poc.signals[s_expr[4]].value = 0;
        var remain = get_var(sim.poc.internal_states.MP_wc);
        if (typeof sim.poc.events.mem[clk - 1] != "undefined" && sim.poc.events.mem[clk - 1] > 0) {
            remain = sim.poc.events.mem[clk - 1] - 1
        }
        sim.poc.events.mem[clk] = remain;
        if (remain > 0) {
            return
        }
        var wordress = address & 4294967292;
        var value = main_memory_getvalue(sim.poc.internal_states.MP, wordress);
        var full_redraw = false;
        if (typeof value === "undefined") {
            value = 0;
            full_redraw = true
        }
        value = main_memory_updatevalues(value, dbvalue, bw, address & 3);
        var origin = "";
        var r_value = main_memory_get_program_counter();
        if (r_value != null) {
            origin = "PC=0x" + r_value.toString(16)
        }
        var melto = {
            value: value >>> 0,
            source_tracking: [origin],
            comments: null
        };
        var elto = main_memory_set(sim.poc.internal_states.MP, wordress, melto);
        sim.poc.signals[s_expr[4]].value = 1;
        show_main_memory(sim.poc.internal_states.MP, wordress, full_redraw, true)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var address = sim.poc.states[s_expr[1]].value;
        var dbvalue = sim.poc.states[s_expr[2]].value;
        var bw = sim.poc.signals[s_expr[3]].value;
        var clk = get_value(sim.poc.states[s_expr[5]].value);
        switch (bw) {
            case 0:
                bw_type = "byte";
                break;
            case 1:
                bw_type = "half";
                break;
            case 2:
                bw_type = "three bytes";
                break;
            case 3:
                bw_type = "word";
                break
        }
        var value = main_memory_getvalue(sim.poc.internal_states.MP, address);
        if (typeof value === "undefined") {
            value = 0
        }
        verbal = "Try to write a " + bw_type + " to memory " + "at address 0x" + address.toString(16) + " with value " + value.toString(16) + ". ";
        return verbal
    }
};
sim.poc.behaviors.MEMORY_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.events.mem = {}
    },
    verbal: function(s_expr) {
        return "Reset the memory (all values will be zeroes). "
    }
};
sim.poc.elements.memory = {
    name: "Main memory",
    description: "Main memory subsystem",
    type: "subcomponent",
    belongs: "MEMORY",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        },
        mrdy: {
            ref: "MRDY"
        }
    },
    signals: {
        bw: {
            ref: "BW"
        },
        r: {
            ref: "R"
        },
        w: {
            ref: "W"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["mrdy", "data"],
    signals_inputs: ["bw", "r", "w"],
    signals_output: []
};
sim.poc.components.IO = {
    name: "IO",
    version: "1",
    abilities: ["IO_TIMER"],
    details_name: ["IO_STATS", "IO_CONFIG"],
    details_fire: [
        ["svg_p:text3775"],
        []
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        var value = get_value(simhw_sim_state(associated_state)) >>> 0;
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_signal("IOR"), 1);
        compute_behavior("FIRE IOR");
        value = get_value(simhw_sim_state("BUS_DB"));
        return value
    },
    set_value: function(elto, value) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        set_value(simhw_sim_state(associated_state), value);
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_state("BUS_DB"), value);
        set_value(simhw_sim_signal("IOW"), 1);
        compute_behavior("FIRE IOW");
        return value
    }
};
sim.poc.internal_states.io_int_factory = [];
sim.poc.internal_states.io_int_factory[0] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[1] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[2] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[3] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[4] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[5] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[6] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
sim.poc.internal_states.io_int_factory[7] = {
    period: 0,
    probability: .5,
    accumulated: 0,
    active: false
};
var IOSR_ID = 4352;
var IOCR_ID = 4356;
var IODR_ID = 4360;
sim.poc.internal_states.io_hash[IOSR_ID] = "IOSR";
sim.poc.internal_states.io_hash[IOCR_ID] = "IOCR";
sim.poc.internal_states.io_hash[IODR_ID] = "IODR";
sim.poc.states.IOSR = {
    name: "IOSR",
    verbal: "IO State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.IOCR = {
    name: "IOCR",
    verbal: "IO Control Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.IODR = {
    name: "IODR",
    verbal: "IO Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.signals.INT = {
    name: "INT",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    depends_on: ["CLK"],
    behavior: ["FIRE C", "FIRE C"],
    fire_name: ["svg_p:tspan4199"],
    draw_data: [
        [],
        ["svg_p:path3809"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.IORDY = {
    name: "IORDY",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    depends_on: ["CLK"],
    behavior: ["FIRE_IFCHANGED IORDY C", "FIRE_IFCHANGED IORDY C"],
    fire_name: ["svg_p:tspan4089", "svg_p:path3793", "svg_p:tspan4089"],
    draw_data: [
        [],
        ["svg_p:path3897"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.IO_IOR = {
    name: "IO_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "IO_IOR BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE M1"],
    fire_name: ["svg_p:tspan4173"],
    draw_data: [
        [],
        ["svg_p:path3795", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.IO_IOW = {
    name: "IO_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "IO_IOW BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE M1"],
    fire_name: ["svg_p:text3785-0-6-0-5-5"],
    draw_data: [
        [],
        ["svg_p:path3805", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.IO_IE = {
    name: "IO_IE",
    visible: true,
    type: "L",
    value: 1,
    default_value: 1,
    nbits: "1",
    behavior: ["NOP", "IO_CHK_I CLK INT INTV; FIRE C"],
    fire_name: [],
    draw_data: [
        [],
        []
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.INTA = {
    name: "INTA",
    visible: true,
    type: "L",
    value: 1,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "INTA CLK INT INTA BUS_DB INTV; FIRE M1; FIRE C"],
    fire_name: ["svg_p:text3785-0-6-0-5-5-1-1"],
    draw_data: [
        [],
        ["svg_p:path3807", "svg_p:path3737"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.behaviors.IO_IOR = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var iosr = get_value(sim.poc.states[s_expr[3]]);
        var iocr = get_value(sim.poc.states[s_expr[4]]);
        var iodr = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == IOSR_ID) set_value(sim.poc.states[s_expr[2]], iosr);
        if (bus_ab == IOCR_ID) set_value(sim.poc.states[s_expr[2]], iocr);
        if (bus_ab == IODR_ID) set_value(sim.poc.states[s_expr[2]], iodr)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var iosr = get_value(sim.poc.states[s_expr[3]]);
        var iocr = get_value(sim.poc.states[s_expr[4]]);
        var iodr = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == IOSR_ID) verbal = "I/O device read at IOSR of value " + iosr + ". ";
        if (bus_ab == IOCR_ID) verbal = "I/O device read at IOCR of value " + iocr + ". ";
        if (bus_ab == IODR_ID) verbal = "I/O device read at IODR of value " + iodr + ". ";
        return verbal
    }
};
sim.poc.behaviors.IO_IOW = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        if (bus_ab != IOSR_ID && bus_ab != IOCR_ID && bus_ab != IODR_ID) {
            return
        }
        if (bus_ab == IOSR_ID) set_value(sim.poc.states[s_expr[3]], bus_db);
        if (bus_ab == IOCR_ID) set_value(sim.poc.states[s_expr[4]], bus_db);
        if (bus_ab == IODR_ID) set_value(sim.poc.states[s_expr[5]], bus_db);
        var iocr_id = get_value(sim.poc.states[s_expr[4]]);
        var iodr_id = get_value(sim.poc.states[s_expr[5]]);
        if (iocr_id < 0 || iocr_id > 7) return;
        set_var(sim.poc.internal_states.io_int_factory[iocr_id].period, iodr_id);
        set_var(sim.poc.internal_states.io_int_factory[iocr_id].probability, 1);
        if (0 == iodr_id) set_var(sim.poc.internal_states.io_int_factory[iocr_id].probability, 0)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        if (bus_ab == IOSR_ID) verbal = "I/O device write at IOSR with value " + bus_db + ". ";
        if (bus_ab == IOCR_ID) verbal = "I/O device write at IOCR with value " + bus_db + ". ";
        if (bus_ab == IODR_ID) verbal = "I/O device write at IODR with value " + bus_db + ". ";
        return verbal
    }
};
sim.poc.behaviors.IO_CHK_I = {
    nparameters: 4,
    types: ["E", "S", "E"],
    operation: function(s_expr) {
        var clk = get_value(sim.poc.states[s_expr[1]]);
        for (var i = sim.poc.internal_states.io_int_factory.length - 1; i >= 0; i--) {
            if (get_var(sim.poc.internal_states.io_int_factory[i].period) == 0) continue;
            if (get_var(sim.poc.internal_states.io_int_factory[i].active) == true) {
                set_value(sim.poc.signals[s_expr[2]], 1);
                set_value(sim.poc.states[s_expr[3]], i)
            }
            if (clk % get_var(sim.poc.internal_states.io_int_factory[i].period) == 0) {
                if (Math.random() > get_var(sim.poc.internal_states.io_int_factory[i].probability)) continue;
                set_var(sim.poc.internal_states.io_int_factory[i].accumulated, get_var(sim.poc.internal_states.io_int_factory[i].accumulated) + 1);
                set_var(sim.poc.internal_states.io_int_factory[i].active, true);
                if (typeof sim.poc.events.io[clk] == "undefined") sim.poc.events.io[clk] = [];
                sim.poc.events.io[clk].push(i);
                set_value(sim.poc.signals[s_expr[2]], 1);
                set_value(sim.poc.states[s_expr[3]], i)
            }
        }
    },
    verbal: function(s_expr) {
        return "Check I/O Interruption. "
    }
};
sim.poc.behaviors.INTA = {
    nparameters: 6,
    types: ["E", "S", "S", "E", "E"],
    operation: function(s_expr) {
        var clk = get_value(sim.poc.states[s_expr[1]]);
        if (typeof sim.poc.events.io[clk] != "undefined") {
            set_value(sim.poc.states[s_expr[4]], sim.poc.events.io[clk][0]);
            return
        }
        set_value(sim.poc.signals[s_expr[2]], 0);
        set_value(sim.poc.states[s_expr[5]], 0);
        for (var i = 0; i < sim.poc.internal_states.io_int_factory.length; i++) {
            if (get_var(sim.poc.internal_states.io_int_factory[i].active)) {
                set_value(sim.poc.signals[s_expr[2]], 0);
                set_value(sim.poc.states[s_expr[5]], i);
                set_value(sim.poc.states[s_expr[4]], i);
                if (typeof sim.poc.events.io[clk] == "undefined") sim.poc.events.io[clk] = [];
                sim.poc.events.io[clk].push(i);
                set_var(sim.poc.internal_states.io_int_factory[i].active, false);
                break
            }
        }
    },
    verbal: function(s_expr) {
        return "Signal an interruption ACK. "
    }
};
sim.poc.behaviors.IO_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.events.io = {};
        for (var i = 0; i < sim.poc.internal_states.io_int_factory.length; i++) {
            set_var(sim.poc.internal_states.io_int_factory[i].accumulated, 0);
            set_var(sim.poc.internal_states.io_int_factory[i].active, false)
        }
    },
    verbal: function(s_expr) {
        return "Reset the I/O device. "
    }
};
sim.poc.elements.io = {
    name: "IO",
    description: "IO",
    type: "subcomponent",
    belongs: "IO",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "IO_IOR"
        },
        iow: {
            ref: "IO_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
sim.poc.components.KBD = {
    name: "KBD",
    version: "1",
    abilities: ["KEYBOARD"],
    details_name: ["KEYBOARD"],
    details_fire: [
        ["svg_p:text3829"]
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        return sim.poc.internal_states.keyboard_content
    },
    set_value: function(elto, value) {
        sim.poc.internal_states.keyboard_content = value;
        return value
    }
};
var KBDR_ID = 256;
var KBSR_ID = 260;
sim.poc.internal_states.io_hash[KBDR_ID] = "KBDR";
sim.poc.internal_states.io_hash[KBSR_ID] = "KBSR";
sim.poc.internal_states.keyboard_content = "";
sim.poc.states.KBDR = {
    name: "KBDR",
    verbal: "Keyboard Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.KBSR = {
    name: "KBSR",
    verbal: "Keyboard Status Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.signals.KBD_IOR = {
    name: "KBD_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "KBD_IOR BUS_AB BUS_DB KBDR KBSR CLK; FIRE M1"],
    fire_name: ["svg_p:tspan4057"],
    draw_data: [
        [],
        ["svg_p:path3863", "svg_p:path3847"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.behaviors.KBD_IOR = {
    nparameters: 6,
    types: ["E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var clk = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab != KBDR_ID && bus_ab != KBSR_ID) {
            return
        }
        if (typeof sim.poc.events.keybd[clk] != "undefined") {
            if (bus_ab == KBDR_ID) set_value(sim.poc.states[s_expr[2]], sim.poc.events.keybd[clk]);
            if (bus_ab == KBSR_ID) set_value(sim.poc.states[s_expr[2]], 1);
            return
        }
        if (get_value(sim.poc.states[s_expr[4]]) == 0) {
            var keybuffer = get_keyboard_content();
            if (keybuffer.length !== 0) {
                var keybuffer_rest = keybuffer.substr(1, keybuffer.length - 1);
                set_keyboard_content(keybuffer_rest);
                set_value(sim.poc.states[s_expr[4]], 1);
                set_value(sim.poc.states[s_expr[3]], keybuffer[0].charCodeAt(0))
            }
        }
        if (get_value(sim.poc.states[s_expr[4]]) == 1) {
            sim.poc.events.keybd[clk] = get_value(sim.poc.states[s_expr[3]])
        }
        if (bus_ab == KBSR_ID) {
            set_value(sim.poc.states[s_expr[2]], get_value(sim.poc.states[s_expr[4]]))
        }
        if (bus_ab == KBDR_ID) {
            if (get_value(sim.poc.states[s_expr[4]]) == 1) set_value(sim.poc.states[s_expr[2]], get_value(sim.poc.states[s_expr[3]]));
            set_value(sim.poc.states[s_expr[4]], 0)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var clk = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == KBDR_ID) verbal = "Read the screen data: " + sim.poc.states[s_expr[2]] + ". ";
        if (bus_ab == KBSR_ID) verbal = "Read the screen state: " + sim.poc.states[s_expr[2]] + ". ";
        return verbal
    }
};
sim.poc.behaviors.KBD_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.events.keybd = {}
    },
    verbal: function(s_expr) {
        return "Reset the keyboard content. "
    }
};
sim.poc.elements.keyboard = {
    name: "Keyboard",
    description: "Keyboard",
    type: "subcomponent",
    belongs: "KBD",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "KBD_IOR"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior"],
    signals_output: []
};
sim.poc.components.SCREEN = {
    name: "SCREEN",
    version: "1",
    abilities: ["SCREEN"],
    details_name: ["SCREEN"],
    details_fire: [
        ["svg_p:text3845"]
    ],
    write_state: function(vec) {
        if (typeof vec.SCREEN == "undefined") {
            vec.SCREEN = {}
        }
        var sim_screen = sim.poc.internal_states.screen_content;
        var sim_lines = sim_screen.trim().split("\n");
        for (var i = 0; i < sim_lines.length; i++) {
            value = sim_lines[i];
            if (value != "") {
                vec.SCREEN[i] = {
                    type: "screen",
                    default_value: "",
                    id: i,
                    op: "==",
                    value: value
                }
            }
        }
        return vec
    },
    read_state: function(vec, check) {
        if (typeof vec.SCREEN == "undefined") {
            vec.SCREEN = {}
        }
        if ("SCREEN" == check.type.toUpperCase().trim()) {
            vec.SCREEN[check.id] = {
                type: "screen",
                default_value: "",
                id: check.id,
                op: check.condition,
                value: check.value
            };
            return true
        }
        return false
    },
    get_state: function(line) {
        var sim_screen = sim.poc.internal_states.screen_content;
        var sim_lines = sim_screen.trim().split("\n");
        var index = parseInt(line);
        if (typeof sim_lines[index] != "undefined") {
            return sim_lines[index]
        }
        return null
    },
    get_value: function(elto) {
        return sim.poc.internal_states.screen_content
    },
    set_value: function(elto, value) {
        sim.poc.internal_states.screen_content = value;
        return value
    }
};
var DDR_ID = 4096;
var DSR_ID = 4100;
sim.poc.internal_states.io_hash[DDR_ID] = "DDR";
sim.poc.internal_states.io_hash[DSR_ID] = "DSR";
sim.poc.internal_states.screen_content = "";
sim.poc.states.DDR = {
    name: "DDR",
    verbal: "Display Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.DSR = {
    name: "DSR",
    verbal: "Display State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.signals.SCR_IOR = {
    name: "SCR_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "SCR_IOR BUS_AB BUS_DB DDR DSR CLK"],
    fire_name: ["svg_p:tspan4004"],
    draw_data: [
        [],
        ["svg_p:path3871", "svg_p:path3857"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.SCR_IOW = {
    name: "SCR_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "SCR_IOW BUS_AB BUS_DB DDR DSR CLK"],
    fire_name: ["svg_p:tspan4006"],
    draw_data: [
        [],
        ["svg_p:path3873", "svg_p:path3857"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.behaviors.SCR_IOR = {
    nparameters: 6,
    types: ["E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var ddr = get_value(sim.poc.states[s_expr[3]]);
        var dsr = get_value(sim.poc.states[s_expr[4]]);
        if (bus_ab == DDR_ID) set_value(sim.poc.states[s_expr[2]], ddr);
        if (bus_ab == DSR_ID) set_value(sim.poc.states[s_expr[2]], dsr)
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var ddr = get_value(sim.poc.states[s_expr[3]]);
        var dsr = get_value(sim.poc.states[s_expr[4]]);
        if (bus_ab == DDR_ID) verbal = "Try to read from the screen the DDR value " + ddr + ". ";
        if (bus_ab == DDR_ID) verbal = "Try to read into the screen the DSR value " + dsr + ". ";
        return verbal
    }
};
sim.poc.behaviors.SCR_IOW = {
    nparameters: 6,
    types: ["E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        var clk = get_value(sim.poc.states[s_expr[5]]);
        var ch = String.fromCharCode(bus_db);
        if (bus_ab != DDR_ID) {
            return
        }
        if (ch == String.fromCharCode(7)) {
            timbre.reset();
            var s1 = T("sin", {
                freq: 440,
                mul: .5
            });
            var s2 = T("sin", {
                freq: 660,
                mul: .5
            });
            T("perc", {
                r: 500
            }, s1, s2).on("ended", (function() {
                this.pause()
            })).bang().play()
        } else {
            var screen = get_screen_content();
            if (typeof sim.poc.events.screen[clk] != "undefined") screen = screen.substr(0, screen.length - 1);
            set_screen_content(screen + String.fromCharCode(bus_db))
        }
        set_value(sim.poc.states[s_expr[3]], bus_db);
        set_value(sim.poc.states[s_expr[4]], 1);
        sim.poc.events.screen[clk] = bus_db
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        var clk = get_value(sim.poc.states[s_expr[5]]);
        var ch = String.fromCharCode(bus_db);
        if (bus_ab == DDR_ID) verbal = "Try to write into the screen the code " + ch + " at clock cycle " + clk + ". ";
        return verbal
    }
};
sim.poc.behaviors.SCREEN_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.events.screen = {}
    },
    verbal: function(s_expr) {
        return "Reset the screen content. "
    }
};
sim.poc.elements.display = {
    name: "Display",
    description: "Display",
    type: "subcomponent",
    belongs: "SCREEN",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "SCR_IOR"
        },
        iow: {
            ref: "SCR_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
sim.poc.components.L3D = {
    name: "L3D",
    version: "1",
    abilities: ["3DLED"],
    details_name: ["3DLED"],
    details_fire: [
        []
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        var value = get_value(simhw_sim_state(associated_state)) >>> 0;
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_signal("L3DR"), 1);
        compute_behavior("FIRE L3DR");
        value = get_value(simhw_sim_state("BUS_DB"));
        return value
    },
    set_value: function(elto, value) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        set_value(simhw_sim_state(associated_state), value);
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_state("BUS_DB"), value);
        set_value(simhw_sim_signal("L3DW"), 1);
        compute_behavior("FIRE L3DW");
        return value
    }
};
sim.poc.internal_states.l3d_dim = 4;
sim.poc.internal_states.l3d_neltos = Math.pow(sim.poc.internal_states.l3d_dim, 3);
sim.poc.internal_states.l3d_state = Array.from({
    length: sim.poc.internal_states.l3d_neltos
}, (() => ({
    active: false
})));
sim.poc.internal_states.l3d_frame = "0".repeat(sim.poc.internal_states.l3d_neltos);
var L3DSR_ID = 8448;
var L3DCR_ID = 8452;
var L3DDR_ID = 8456;
sim.poc.internal_states.io_hash[L3DSR_ID] = "L3DSR";
sim.poc.internal_states.io_hash[L3DCR_ID] = "L3DCR";
sim.poc.internal_states.io_hash[L3DDR_ID] = "L3DDR";
sim.poc.states.L3DSR = {
    name: "L3DSR",
    verbal: "L3D State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.L3DCR = {
    name: "L3DCR",
    verbal: "L3D Control Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.L3DDR = {
    name: "L3DDR",
    verbal: "L3D Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.signals.L3D_IOR = {
    name: "L3D_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "L3D_IOR BUS_AB BUS_DB L3DSR L3DCR L3DDR CLK; FIRE M1"],
    fire_name: ["svg_p:tspan4173"],
    draw_data: [
        [],
        ["svg_p:path3795", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.L3D_IOW = {
    name: "L3D_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "L3D_IOW BUS_AB BUS_DB L3DSR L3DCR L3DDR CLK; FIRE M1; L3D_SYNC"],
    fire_name: ["svg_p:text3785-0-6-0-5-5"],
    draw_data: [
        [],
        ["svg_p:path3805", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.behaviors.L3D_IOR = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var iosr = get_value(sim.poc.states[s_expr[3]]);
        var iocr = get_value(sim.poc.states[s_expr[4]]);
        var iodr = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == L3DCR_ID) {
            set_value(sim.poc.states[s_expr[2]], iocr)
        }
        if (bus_ab == L3DDR_ID) {
            set_value(sim.poc.states[s_expr[2]], iodr)
        }
        if (bus_ab == L3DCR_ID) {
            var x = (iodr & 4278190080) >> 24;
            var y = (iodr & 16711680) >> 16;
            var z = (iodr & 65280) >> 8;
            var p = z * Math.pow(sim.poc.internal_states.l3d_dim, 2) + y * sim.poc.internal_states.l3d_dim + x;
            var s = get_var(sim.poc.internal_states.l3d_state[p].active);
            set_value(sim.poc.states[s_expr[2]], s)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var iosr = get_value(sim.poc.states[s_expr[3]]);
        var iocr = get_value(sim.poc.states[s_expr[4]]);
        var iodr = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == L3DSR_ID) verbal = "I/O device read at L3DSR of value " + iosr + ". ";
        if (bus_ab == L3DCR_ID) verbal = "I/O device read at L3DCR of value " + iocr + ". ";
        if (bus_ab == L3DDR_ID) verbal = "I/O device read at L3DDR of value " + iodr + ". ";
        return verbal
    }
};
sim.poc.behaviors.L3D_IOW = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        if (bus_ab != L3DSR_ID && bus_ab != L3DCR_ID && bus_ab != L3DDR_ID) {
            return
        }
        if (bus_ab == L3DSR_ID) {
            set_value(sim.poc.states[s_expr[3]], bus_db)
        }
        if (bus_ab == L3DDR_ID) {
            set_value(sim.poc.states[s_expr[5]], bus_db)
        }
        if (bus_ab == L3DCR_ID) {
            set_value(sim.poc.states[s_expr[4]], bus_db);
            var x = (bus_db & 4278190080) >> 24;
            var y = (bus_db & 16711680) >> 16;
            var z = (bus_db & 65280) >> 8;
            var p = z * Math.pow(sim.poc.internal_states.l3d_dim, 2) + y * sim.poc.internal_states.l3d_dim + x;
            var s = (bus_db & 255) != 0;
            var l3dstates = sim.poc.internal_states.l3d_state;
            set_var(l3dstates[p].active, s)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        if (bus_ab == L3DSR_ID) verbal = "I/O device write at L3DSR with value " + bus_db + ". ";
        if (bus_ab == L3DCR_ID) verbal = "I/O device write at L3DCR with value " + bus_db + ". ";
        if (bus_ab == L3DDR_ID) verbal = "I/O device write at L3DDR with value " + bus_db + ". ";
        return verbal
    }
};
sim.poc.behaviors.L3D_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.events.l3d = {};
        var n = sim.poc.internal_states.l3d_state.length;
        for (var i = 0; i < n; i++) {
            set_var(sim.poc.internal_states.l3d_state[i].active, false)
        }
        n = Math.pow(sim.poc.internal_states.l3d_dim, 3);
        var o = "0".repeat(n);
        sim.poc.internal_states.l3d_frame = o;
        simcore_rest_call("L3D", "POST", "/", {
            frame: o
        })
    },
    verbal: function(s_expr) {
        return "Reset the I/O device. "
    }
};
sim.poc.behaviors.L3D_SYNC = {
    nparameters: 1,
    operation: function(s_expr) {
        var l3dstates = sim.poc.internal_states.l3d_state;
        var o = "";
        var p = 0;
        var n = sim.poc.internal_states.l3d_dim;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {
                    p = k * Math.pow(sim.poc.internal_states.l3d_dim, 2) + j * sim.poc.internal_states.l3d_dim + i;
                    if (get_var(l3dstates[p].active)) o = o + "1";
                    else o = o + "0"
                }
            }
        }
        if (sim.poc.internal_states.l3d_frame != o) {
            sim.poc.internal_states.l3d_frame = o;
            simcore_rest_call("L3D", "POST", "/", {
                frame: o
            })
        }
    },
    verbal: function(s_expr) {
        return "Sync State with Device. "
    }
};
sim.poc.elements.l3d = {
    name: "L3D",
    description: "3D Led Cube",
    type: "subcomponent",
    belongs: "L3D",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "L3D_IOR"
        },
        iow: {
            ref: "L3D_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};
sim.poc.components.LEDM = {
    name: "LEDM",
    version: "1",
    abilities: ["LEDMATRIX"],
    details_name: ["LEDMATRIX"],
    details_fire: [
        []
    ],
    write_state: function(vec) {
        return vec
    },
    read_state: function(o, check) {
        return false
    },
    get_state: function(reg) {
        return null
    },
    get_value: function(elto) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        var value = get_value(simhw_sim_state(associated_state)) >>> 0;
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_signal("LEDMR"), 1);
        compute_behavior("FIRE LEDMR");
        value = get_value(simhw_sim_state("BUS_DB"));
        return value
    },
    set_value: function(elto, value) {
        var associated_state = simhw_internalState_get("io_hash", elto);
        set_value(simhw_sim_state(associated_state), value);
        set_value(simhw_sim_state("BUS_AB"), elto);
        set_value(simhw_sim_state("BUS_DB"), value);
        set_value(simhw_sim_signal("LEDMW"), 1);
        compute_behavior("FIRE LEDMW");
        return value
    }
};
sim.poc.internal_states.ledm_dim = 24;
sim.poc.internal_states.ledm_neltos = Math.pow(sim.poc.internal_states.ledm_dim, 2);
sim.poc.internal_states.ledm_state = Array.from({
    length: sim.poc.internal_states.ledm_neltos
}, (() => ({
    color: 0
})));
sim.poc.internal_states.color14 = ["#000000", "#FFFFFF", "#FF0000", "#FF8800", "#FFFF00", "#88FF00", "#00FF00", "#00FF88", "#00FFFF", "#0088FF", "#0000FF", "#8800FF", "#FF00FF", "#FF0088"];
sim.poc.internal_states.ledm_colors = sim.poc.internal_states.color14.map((x => x));
sim.poc.internal_states.ledm_frame = "0".repeat(sim.poc.internal_states.ledm_neltos);
var LEDMSR_ID = 12544;
var LEDMCR_ID = 12548;
var LEDMDR_ID = 12552;
sim.poc.internal_states.io_hash[LEDMSR_ID] = "LEDMSR";
sim.poc.internal_states.io_hash[LEDMCR_ID] = "LEDMCR";
sim.poc.internal_states.io_hash[LEDMDR_ID] = "LEDMDR";
sim.poc.states.LEDMSR = {
    name: "LEDMSR",
    verbal: "LEDM State Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.LEDMCR = {
    name: "LEDMCR",
    verbal: "LEDM Control Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.states.LEDMDR = {
    name: "LEDMDR",
    verbal: "LEDM Data Register",
    visible: false,
    nbits: "32",
    value: 0,
    default_value: 0,
    draw_data: []
};
sim.poc.signals.LEDM_IOR = {
    name: "LEDM_IOR",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LEDM_IOR BUS_AB BUS_DB LEDMSR LEDMCR LEDMDR CLK; FIRE M1"],
    fire_name: ["svg_p:tspan4173"],
    draw_data: [
        [],
        ["svg_p:path3795", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.signals.LEDM_IOW = {
    name: "LEDM_IOW",
    visible: true,
    type: "L",
    value: 0,
    default_value: 0,
    nbits: "1",
    behavior: ["NOP", "LEDM_IOW BUS_AB BUS_DB LEDMSR LEDMCR LEDMDR CLK; FIRE M1; LEDM_SYNC"],
    fire_name: ["svg_p:text3785-0-6-0-5-5"],
    draw_data: [
        [],
        ["svg_p:path3805", "svg_p:path3733"]
    ],
    draw_name: [
        [],
        []
    ]
};
sim.poc.behaviors.LEDM_IOR = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var iosr = get_value(sim.poc.states[s_expr[3]]);
        var iocr = get_value(sim.poc.states[s_expr[4]]);
        var iodr = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == LEDMCR_ID) {
            set_value(sim.poc.states[s_expr[2]], iocr)
        }
        if (bus_ab == LEDMDR_ID) {
            set_value(sim.poc.states[s_expr[2]], iodr)
        }
        if (bus_ab == LEDMCR_ID) {
            var x = (iodr & 4278190080) >> 24;
            var y = (iodr & 16711680) >> 16;
            var p = y * sim.poc.internal_states.ledm_dim + x;
            var s = get_var(sim.poc.internal_states.ledm_state[p].color);
            set_value(sim.poc.states[s_expr[2]], s)
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var iosr = get_value(sim.poc.states[s_expr[3]]);
        var iocr = get_value(sim.poc.states[s_expr[4]]);
        var iodr = get_value(sim.poc.states[s_expr[5]]);
        if (bus_ab == LEDMSR_ID) verbal = "I/O device read at LEDMSR of value " + iosr + ". ";
        if (bus_ab == LEDMCR_ID) verbal = "I/O device read at LEDMCR of value " + iocr + ". ";
        if (bus_ab == LEDMDR_ID) verbal = "I/O device read at LEDMDR of value " + iodr + ". ";
        return verbal
    }
};
sim.poc.behaviors.LEDM_IOW = {
    nparameters: 7,
    types: ["E", "E", "E", "E", "E", "E"],
    operation: function(s_expr) {
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        switch (bus_ab) {
            case LEDMSR_ID:
                set_value(sim.poc.states[s_expr[3]], bus_db);
                break;
            case LEDMDR_ID:
                set_value(sim.poc.states[s_expr[5]], bus_db);
                break;
            case LEDMCR_ID:
                set_value(sim.poc.states[s_expr[4]], bus_db);
                break;
            default:
                break
        }
        if (LEDMCR_ID == bus_ab) {
            var dr = get_value(sim.poc.states[s_expr[5]]);
            if (16 & bus_db) {
                var x = (dr & 4278190080) >> 24;
                var y = (dr & 16711680) >> 16;
                var s = dr & 255;
                set_value(sim.poc.states[s_expr[3]], 1);
                if (x >= sim.poc.internal_states.ledm_dim && y >= sim.poc.internal_states.ledm_dim) {
                    set_value(sim.poc.states[s_expr[3]], -1);
                    return
                }
                var p = y * sim.poc.internal_states.ledm_dim + x;
                set_var(sim.poc.internal_states.ledm_state[p].color, s)
            }
            if (32 & bus_db) {
                set_value(sim.poc.states[s_expr[3]], 1);
                var s = 0;
                var neltos = sim.poc.internal_states.ledm_neltos;
                var ldmstates = sim.poc.internal_states.ledm_state;
                for (var p = 0; p < neltos; p = p + 4) {
                    s = simcore_native_get_value("MEMORY", dr + p);
                    set_var(sim.poc.internal_states.ledm_state[p + 0].color, (s & 255) >> 0);
                    set_var(sim.poc.internal_states.ledm_state[p + 1].color, (s & 65280) >> 8);
                    set_var(sim.poc.internal_states.ledm_state[p + 2].color, (s & 16711680) >> 16);
                    set_var(sim.poc.internal_states.ledm_state[p + 3].color, (s & 4278190080) >> 24)
                }
            }
            if (64 & bus_db) {
                set_value(sim.poc.states[s_expr[3]], 1);
                var s = 0;
                var c = "";
                var neltos = sim.poc.internal_states.ledm_colors.length;
                for (var p = 0; p < neltos; p++) {
                    s = simcore_native_get_value("MEMORY", dr + p * 4);
                    s = (s & 4294967040) >>> 8;
                    s = s.toString(16);
                    c = "#" + simcoreui_pack(s, 6);
                    sim.poc.internal_states.ledm_colors[p] = c
                }
            }
        }
    },
    verbal: function(s_expr) {
        var verbal = "";
        var bus_ab = get_value(sim.poc.states[s_expr[1]]);
        var bus_db = get_value(sim.poc.states[s_expr[2]]);
        switch (bus_ab) {
            case LEDMSR_ID:
                verbal = "I/O device write at LEDMSR with value " + bus_db + ". ";
                break;
            case LEDMDR_ID:
                verbal = "I/O device write at LEDMCR with value " + bus_db + ". ";
                break;
            case LEDMCR_ID:
                var dr = get_value(sim.poc.states[s_expr[5]]);
                if (16 & bus_db) {
                    var x = (dr & 4278190080) >> 24;
                    var y = (dr & 16711680) >> 16;
                    var s = dr & 255;
                    verbal = "I/O device write at LEDMCR with value " + bus_db + " (set pixel x:" + x + ", y:" + y + ", with color:" + s + "). "
                }
                if (64 & bus_db) {
                    verbal = "I/O device write at LEDMCR with value " + bus_db + " (set color palette at:" + bus_db + "). "
                }
                break;
            default:
                break
        }
        return verbal
    }
};
sim.poc.behaviors.LEDM_RESET = {
    nparameters: 1,
    operation: function(s_expr) {
        sim.poc.events.ledm = {};
        sim.poc.internal_states.ledm_colors = sim.poc.internal_states.color14.map((x => x));
        for (var i = 0; i < sim.poc.internal_states.ledm_state.length; i++) {
            set_var(sim.poc.internal_states.ledm_state[i].color, 1);
            set_var(sim.poc.internal_states.ledm_state[i].color, 0)
        }
        var o = "0".repeat(64);
        sim.poc.internal_states.ledm_frame = o;
        simcore_rest_call("LEDM", "POST", "/", {
            frame: o
        })
    },
    verbal: function(s_expr) {
        return "Reset the I/O device. "
    }
};
sim.poc.behaviors.LEDM_SYNC = {
    nparameters: 1,
    operation: function(s_expr) {
        var ledmstates = sim.poc.internal_states.ledm_state;
        var o = "";
        var p = 0;
        for (var j = 0; j < sim.poc.internal_states.ledm_dim; j++) {
            for (var k = 0; k < sim.poc.internal_states.ledm_dim; k++) {
                p = j * sim.poc.internal_states.ledm_dim + k;
                o = o + get_var(ledmstates[p].color).toString(16)
            }
        }
        if (sim.poc.internal_states.ledm_frame != o) {
            sim.poc.internal_states.ledm_frame = o;
            simcore_rest_call("LEDM", "POST", "/", {
                frame: o
            })
        }
    },
    verbal: function(s_expr) {
        return "Sync State with Device. "
    }
};
sim.poc.elements.ledm = {
    name: "LEDM",
    description: "3D Led Cube",
    type: "subcomponent",
    belongs: "LEDM",
    states: {
        addr: {
            ref: "BUS_AB"
        },
        data: {
            ref: "BUS_DB"
        }
    },
    signals: {
        ior: {
            ref: "LEDM_IOR"
        },
        iow: {
            ref: "LEDM_IOW"
        }
    },
    states_inputs: ["addr", "data"],
    states_outputs: ["data"],
    signals_inputs: ["ior", "iow"],
    signals_output: []
};

function nextToken(context) {
    var tok = "";
    var first = "";
    var last = "";
    var token_type = "";
    while ("# \t\n\r".indexOf(context.text[context.t]) != -1 && context.t < context.text.length) {
        if (context.text[context.t] == "#") {
            first = context.t + 1;
            while ("\n".indexOf(context.text[context.t]) == -1 && context.t < context.text.length) {
                context.t++
            }
            last = context.t;
            tok = context.text.substring(first, last);
            tok = tok.trim();
            context.comments.push(tok)
        }
        if (context.text[context.t] == "\n") {
            context.line++;
            context.newlines.push(context.t)
        }
        context.t++
    }
    if ("{},()=:".indexOf(context.text[context.t]) != -1 && context.t < context.text.length) {
        tok = context.text[context.t];
        context.t++;
        context.tokens.push(tok);
        context.token_types.push("TOKEN");
        context.i = context.tokens.length - 1;
        return context
    }
    if ('"' == context.text[context.t]) {
        first = context.t;
        context.t++;
        while ('"'.indexOf(context.text[context.t]) == -1 && context.t < context.text.length) {
            if ("\\".indexOf(context.text[context.t]) != -1) {
                context.t++
            }
            context.t++
        }
        context.t++;
        last = context.t;
        token_type = "STRING"
    } else if ("'" == context.text[context.t]) {
        first = context.t;
        context.t++;
        while ("'".indexOf(context.text[context.t]) == -1 && context.t < context.text.length) {
            if ("\\".indexOf(context.text[context.t]) != -1) {
                context.t++
            }
            context.t++
        }
        context.t++;
        last = context.t;
        token_type = "STRING"
    } else {
        first = context.t;
        while ("{},()=:# \t\n\r".indexOf(context.text[context.t]) == -1 && context.t < context.text.length) {
            context.t++
        }
        last = context.t;
        token_type = "TOKEN"
    }
    var tmp_context = context.t;
    while ("# \t\n\r".indexOf(context.text[tmp_context]) != -1 && tmp_context < context.text.length) {
        if (context.text[tmp_context] == "#") {
            while ("\n".indexOf(context.text[tmp_context]) == -1 && tmp_context < context.text.length) {
                tmp_context++
            }
        }
        tmp_context++
    }
    if (":" == context.text[tmp_context]) {
        token_type = "TAG";
        context.t = tmp_context + 1
    }
    tok = context.text.substring(first, last);
    tok = tok.trim();
    if ("TAG" == token_type) {
        tok = tok + ":"
    }
    context.tokens.push(tok);
    context.token_types.push(token_type);
    context.i = context.tokens.length - 1;
    return context
}

function getToken(context) {
    return context.tokens[context.i]
}

function getTokenType(context) {
    return context.token_types[context.i]
}

function isToken(context, text) {
    return getToken(context) == text.trim()
}

function isToken_arr(context, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (getToken(context) == arr[i].trim()) {
            return true
        }
    }
    return false
}

function langError(context, msgError) {
    var line2 = 0;
    if (context.newlines.length > 0) line2 = context.newlines[context.newlines.length - 1] + 1;
    var line1 = 0;
    if (context.newlines.length > 1) line1 = context.newlines[context.newlines.length - 2] + 1;
    var lowI = line1;
    var highI = Math.min(context.t - 1, line2 + 32);
    for (; typeof context.text[highI + 1] != "undefined" && context.text[highI + 1] != "\n"; highI++);
    var line3 = highI + 2;
    highI++;
    for (; typeof context.text[highI + 1] != "undefined" && context.text[highI + 1] != "\n"; highI++);
    highI++;
    context.error = "<br>" + "<pre class='border rounded p-3' style='background-color: inherit !important'>" + "...\n";
    for (var i = lowI; i < highI; i++) {
        if (i == line1) context.error += " " + (context.line - 1) + "\t";
        if (i == line2) context.error += "*" + context.line + "\t";
        if (i == line3) context.error += " " + (context.line + 1) + "\t";
        if (typeof context.text[i] != "undefined") context.error += context.text[i];
        else context.error += "&lt;EOF&gt;"
    }
    context.error += "\n...\n" + "</pre>" + "(*) " + i18n_get_TagFor("compiler", "PROBLEM AROUND LINE") + " " + context.line + ": <br>" + msgError + ".<br>";
    simcore_ga("compile", "compile.error", "compile.error." + msgError);
    return context
}

function getLabelContext(context) {
    return {
        t: context.t,
        line: context.line,
        newlines: context.newlines.slice()
    }
}

function setLabelContext(context, labelContext) {
    context.t = labelContext.t;
    context.line = labelContext.line;
    context.newlines = labelContext.newlines
}

function getComments(context) {
    return context.comments.join("\n")
}

function resetComments(context) {
    context.comments = []
}

function nextNative(context) {
    var first = context.t;
    var last = context.t;
    var braces = 1;
    while (context.t < context.text.length && braces != 0) {
        if ("{" == context.text[context.t]) braces++;
        if ("}" == context.text[context.t]) braces--;
        context.t++
    }
    last = context.t - 1;
    var tok = context.text.substring(first, last);
    context.tokens.push(tok);
    context.token_types.push("NATIVE");
    context.i = context.tokens.length - 1;
    return context
}
control_sequences = {
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t",
    v: "\v",
    a: String.fromCharCode(7),
    "'": "'",
    '"': '"',
    0: "\0"
};

function treatControlSequences(possible_value) {
    var ret = {};
    ret.string = "";
    ret.error = false;
    for (var i = 0; i < possible_value.length; i++) {
        if ("\\" != possible_value[i]) {
            ret.string = ret.string + possible_value[i];
            continue
        }
        i++;
        if (control_sequences[possible_value[i]] === "undefined") {
            ret.string = i18n_get_TagFor("compiler", "UNKNOWN ESCAPE CHAR") + "Unknown escape char" + " '\\" + possible_value[i] + "'";
            ret.error = true;
            return ret
        }
        ret.string = ret.string + control_sequences[possible_value[i]]
    }
    return ret
}
var html_sequences = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'"
};

function treatHTMLSequences(text_with_html) {
    var re = null;
    var key = null;
    for (key in html_sequences) {
        re = new RegExp(key, "gi");
        text_with_html = text_with_html.replace(re, html_sequences[key])
    }
    return text_with_html
}

function read_microprg(context) {
    var microprograma = [];
    var microcomments = [];
    resetComments(context);
    if (!isToken(context, "{")) {
        return langError(context, i18n_get_TagFor("compiler", "OPEN BRACE NOT FOUND"))
    }
    nextToken(context);
    while (!isToken(context, "}")) {
        var microInstruccionAux = {};
        if (!isToken(context, "(")) {
            var newLabelName = getToken(context);
            newLabelName = newLabelName.substring(0, newLabelName.length - 1);
            if ("TAG" != getTokenType(context)) {
                return langError(context, i18n_get_TagFor("compiler", "LABEL NOT FOUND") + "'" + newLabelName + "'")
            }
            for (var contadorMCAux in context.etiquetas) {
                if (context.etiquetas[contadorMCAux] == newLabelName) {
                    return langError(context, i18n_get_TagFor("compiler", "REPEATED LABEL") + "'" + getToken(context) + "'")
                }
            }
            context.etiquetas[context.contadorMC] = newLabelName;
            if (newLabelName.match("[a-zA-Z_0-9]*")[0] != newLabelName) {
                return langError(context, i18n_get_TagFor("compiler", "INVALID LABEL FORMAT") + "'" + getToken(context) + "'")
            }
            nextToken(context)
        }
        if (!isToken(context, "(")) {
            return langError(context, i18n_get_TagFor("compiler", "OPEN PAREN. NOT FOUND"))
        }
        nextToken(context);
        while (!isToken(context, ")")) {
            var nombre_tok = getToken(context).toUpperCase();
            if (nombre_tok == "MADDR") {
                nextToken(context);
                if (!isToken(context, "=")) {
                    return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
                }
                nextToken(context);
                var labelsNotFoundAux = {};
                labelsNotFoundAux.nombre = getToken(context);
                labelsNotFoundAux.cycle = microprograma.length;
                labelsNotFoundAux.index = context.i;
                labelsNotFoundAux.instruction = context.instrucciones.length;
                var etiquetaFounded = 0;
                for (var k in context.etiquetas) {
                    if (isToken(context, context.etiquetas[k])) {
                        microInstruccionAux[nombre_tok] = k.toString();
                        etiquetaFounded = 1
                    }
                }
                if (etiquetaFounded == 0) {
                    context.labelsNotFound.push(labelsNotFoundAux)
                }
                nextToken(context);
                if (isToken(context, ",")) nextToken(context);
                continue
            }
            if (typeof simhw_sim_signal(nombre_tok) == "undefined") {
                return langError(context, i18n_get_TagFor("compiler", "SIGNAL NOT EXISTS") + "'" + nombre_tok + "'")
            }
            if (typeof simhw_sim_signal(nombre_tok).forbidden != "undefined") {
                return langError(context, nombre_tok + " " + i18n_get_TagFor("compiler", "SIGNAL NO DIRECTLY"))
            }
            microInstruccionAux[nombre_tok] = 1;
            nextToken(context);
            if (isToken(context, "=")) {
                nextToken(context);
                microInstruccionAux[nombre_tok] = parseInt(getToken(context), 2);
                if (getToken(context).match("[01]*")[0] != getToken(context)) {
                    return langError(context, i18n_get_TagFor("compiler", "INCORRECT BIN. FORMAT") + "'" + getToken(context) + "'")
                }
                if (microInstruccionAux[nombre_tok] >= Math.pow(2, simhw_sim_signal(nombre_tok).nbits)) {
                    return langError(context, i18n_get_TagFor("compiler", "OUT OF RANGE") + "'" + getToken(context) + "'")
                }
                nextToken(context)
            }
            if (isToken(context, ",")) {
                nextToken(context)
            }
        }
        var acc_cmt = getComments(context);
        microcomments.push(acc_cmt);
        resetComments(context);
        microprograma.push(microInstruccionAux);
        context.contadorMC++;
        nextToken(context);
        if (isToken(context, ",")) nextToken(context)
    }
    if (microprograma.length === 0) {
        return langError(context, i18n_get_TagFor("compiler", "EMPTY MICROCODE"))
    }
    nextToken(context);
    return {
        NATIVE: "",
        microprograma: microprograma,
        microcomments: microcomments
    }
}

function read_native(context) {
    var microprograma = [];
    var microcomments = [];
    if (!isToken(context, "{")) {
        return langError(context, i18n_get_TagFor("compiler", "OPEN BRACE NOT FOUND"))
    }
    nextNative(context);
    var native_code = getToken(context);
    microprograma.push({});
    microcomments.push("");
    nextToken(context);
    return {
        NATIVE: native_code,
        microprograma: microprograma,
        microcomments: microcomments
    }
}

function find_first_cocop(context, curr_instruction, first_co, last_co) {
    var k = 0;
    var m = 0;
    var ret = {};
    ret.label_co = "";
    ret.label_cop = "";
    var cop_overlaps = false;
    for (m = 0; m < curr_instruction.fields.length; m++) {
        if (curr_instruction.fields[m].stopbit === "0") {
            cop_overlaps = true;
            break
        }
    }
    for (j = first_co; j < last_co; j++) {
        ret.label_co = j.toString(2).padStart(6, "0");
        if (typeof context.co_cop[ret.label_co] === "undefined") {
            context.co_cop[ret.label_co] = {};
            context.co_cop[ret.label_co].withcop = false;
            return ret
        }
        if (typeof curr_instruction.cop !== "undefined") {
            if (typeof context.co_cop[ret.label_co].cop[curr_instruction.cop] !== "undefined") {
                continue
            }
            ret.label_cop = curr_instruction.cop;
            return ret
        }
        if (cop_overlaps === true) {
            continue
        }
        if (context.co_cop[ret.label_co].withcop === false) {
            continue
        }
        first_cop = 0;
        last_cop = Math.pow(2, 4) - 1;
        for (k = first_cop; k < last_cop; k++) {
            ret.label_cop = k.toString(2).padStart(4, "0");
            if (context.co_cop[ret.label_co].cop === null || typeof context.co_cop[ret.label_co].cop === "undefined") {
                context.co_cop[ret.label_co].cop = {};
                return ret
            }
            if (typeof context.co_cop[ret.label_co].cop[ret.label_cop] === "undefined") {
                return ret
            }
        }
    }
    return ret
}

function loadFirmware(text) {
    var ret = {};
    var xr_info = simhw_sim_ctrlStates_get();
    var all_ones_co = "1".repeat(xr_info.ir.default_eltos.co.length);
    var context = {};
    context.line = 1;
    context.error = null;
    context.i = 0;
    context.contadorMC = 0;
    context.etiquetas = {};
    context.labelsNotFound = [];
    context.instrucciones = [];
    context.co_cop = {};
    context.registers = [];
    context.text = text;
    context.tokens = [];
    context.token_types = [];
    context.t = 0;
    context.newlines = [];
    context.pseudoInstructions = [];
    context.stackRegister = null;
    context.comments = [];
    var i = 0;
    nextToken(context);
    while (context.t < context.text.length) {
        if (isToken(context, "registers")) {
            nextToken(context);
            if (!isToken(context, "{")) {
                return langError(context, i18n_get_TagFor("compiler", "OPEN BRACE NOT FOUND"))
            }
            nextToken(context);
            while (!isToken(context, "}")) {
                var nombre_reg = getToken(context);
                nextToken(context);
                if (!isToken(context, "=")) {
                    return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
                }
                nextToken(context);
                if (!isToken(context, "(")) {
                    context.registers[nombre_reg] = [];
                    context.registers[nombre_reg].push(getToken(context))
                } else {
                    nextToken(context);
                    if (isToken(context, ")")) {
                        return langError(context, i18n_get_TagFor("compiler", "EMPTY NAME LIST"))
                    }
                    context.registers[nombre_reg] = [];
                    while (!isToken(context, ")")) {
                        context.registers[nombre_reg].push(getToken(context));
                        nextToken(context);
                        if (isToken(context, ",")) {
                            nextToken(context)
                        }
                    }
                }
                nextToken(context);
                if (isToken(context, "(")) {
                    if (context.stackRegister != null) {
                        return langError(context, i18n_get_TagFor("compiler", "DUPLICATE SP"))
                    }
                    nextToken(context);
                    if (!isToken(context, "stack_pointer")) {
                        return langError(context, i18n_get_TagFor("compiler", "NO SP"))
                    }
                    context.stackRegister = nombre_reg;
                    nextToken(context);
                    if (!isToken(context, ")")) {
                        return langError(context, i18n_get_TagFor("compiler", "CLOSE PAREN. NOT FOUND"))
                    }
                    nextToken(context)
                }
                if (isToken(context, ",")) {
                    nextToken(context)
                }
            }
            nextToken(context);
            continue
        }
        if (isToken(context, "pseudoinstructions")) {
            nextToken(context);
            if (!isToken(context, "{")) {
                return langError(context, i18n_get_TagFor("compiler", "OPEN BRACE NOT FOUND"))
            }
            nextToken(context);
            while (!isToken(context, "}")) {
                var pseudoInstructionAux = {};
                var pseudoInitial = {};
                pseudoInitial.signature = "";
                pseudoInitial.name = "";
                pseudoInitial.fields = [];
                pseudoInitial.name = getToken(context);
                pseudoInitial.signature = pseudoInitial.signature + getToken(context) + ",";
                nextToken(context);
                while (!isToken(context, "{")) {
                    var pseudoFieldAux = {};
                    pseudoFieldAux.name = "";
                    pseudoFieldAux.type = "";
                    pseudoFieldAux.indirect = false;
                    if (isToken(context, "(")) {
                        nextToken(context);
                        pseudoFieldAux.name += getToken(context);
                        nextToken(context);
                        if (!isToken(context, ")")) {
                            return langError(context, i18n_get_TagFor("compiler", "CLOSE PAREN. NOT FOUND"))
                        }
                        nextToken(context);
                        pseudoFieldAux.indirect = true
                    } else {
                        pseudoFieldAux.name += getToken(context);
                        nextToken(context)
                    }
                    if (!isToken(context, "=")) {
                        return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND") + " (for name=type)")
                    }
                    nextToken(context);
                    pseudoFieldAux.type += getToken(context).replace("num", "inm");
                    switch (pseudoFieldAux.type) {
                        case "reg":
                        case "inm":
                        case "addr":
                        case "address":
                            break;
                        default:
                            return langError(context, i18n_get_TagFor("compiler", "INVALID PARAMETER") + pseudoFieldAux.type + "." + i18n_get_TagFor("compiler", "ALLOWED PARAMETER"))
                    }
                    pseudoInitial.fields.push(pseudoFieldAux);
                    if (pseudoFieldAux.indirect == true) pseudoInitial.signature += "(" + getToken(context) + "),";
                    else pseudoInitial.signature += getToken(context) + ",";
                    nextToken(context);
                    if (isToken(context, ",")) {
                        nextToken(context)
                    }
                }
                nextToken(context);
                pseudoInitial.signature = pseudoInitial.signature.substr(0, pseudoInitial.signature.length - 1).replace(/num/g, "inm");
                pseudoInstructionAux.initial = pseudoInitial;
                var contPseudoFinish = 0;
                var pseudoFinishAux = {};
                pseudoFinishAux.signature = "";
                var inStart = 0;
                var cont = false;
                while (!isToken(context, "}")) {
                    if (inStart == 0) {
                        for (i = 0; i < context.instrucciones.length; i++) {
                            if (context.instrucciones[i].name == getToken(context)) {
                                cont = true;
                                break
                            }
                        }
                        if (!cont) {
                            return langError(context, i18n_get_TagFor("compiler", "UNDEF. INSTR.") + "'" + getToken(context) + "'")
                        }
                    }
                    if (getToken(context) == ";") inStart = 0;
                    else inStart++;
                    pseudoFinishAux.signature = pseudoFinishAux.signature + getToken(context) + " ";
                    nextToken(context)
                }
                pseudoInstructionAux.finish = pseudoFinishAux;
                pseudoInstructionAux.finish.signature = pseudoInstructionAux.finish.signature.replace(";", "\n");
                context.pseudoInstructions.push(pseudoInstructionAux);
                nextToken(context)
            }
            nextToken(context);
            continue
        }
        if (isToken(context, "begin")) {
            var instruccionAux = {};
            instruccionAux.name = getToken(context);
            instruccionAux["mc-start"] = context.contadorMC;
            nextToken(context);
            if (isToken(context, ",")) nextToken(context);
            instruccionAux["is_native"] = false;
            if (isToken(context, "native")) {
                instruccionAux["is_native"] = true;
                nextToken(context);
                if (isToken(context, ",")) nextToken(context);
                context.etiquetas[context.contadorMC] = "fetch"
            }
            ret = {};
            if (true == instruccionAux.is_native) ret = read_native(context);
            else ret = read_microprg(context);
            if (typeof ret.error != "undefined") return ret;
            instruccionAux.signature = "begin";
            instruccionAux.signatureGlobal = "begin";
            instruccionAux.signatureUser = "begin";
            instruccionAux.signatureRaw = "begin";
            instruccionAux.NATIVE = ret.NATIVE;
            instruccionAux.microcode = ret.microprograma;
            instruccionAux.microcomments = ret.microcomments;
            context.instrucciones.push(instruccionAux);
            context.contadorMC = context.contadorMC + 9;
            continue
        }
        var instruccionAux = {};
        instruccionAux.name = getToken(context);
        instruccionAux["mc-start"] = context.contadorMC;
        var re_name = "[a-zA-Z_0-9.]*";
        if (instruccionAux.name.match(re_name)[0] != instruccionAux.name) {
            return langError(context, i18n_get_TagFor("compiler", "INS. NAME") + "'" + instruccionAux.name + "' " + i18n_get_TagFor("compiler", "NOT VALID FOR") + re_name)
        }
        var firma = "";
        var firmaGlobal = "";
        var firmaUsuario = "";
        var numeroCampos = 0;
        var campos = [];
        firma = getToken(context) + ",";
        firmaUsuario = getToken(context) + " ";
        nextToken(context);
        while (isToken(context, ",")) nextToken(context);
        while (!isToken(context, "{")) {
            while (isToken(context, ",")) nextToken(context);
            var plus_found = false;
            if (!isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")")) {
                var campoAux = {};
                var auxValue = getToken(context);
                if (auxValue[auxValue.length - 1] == "+") {
                    auxValue = auxValue.substring(0, auxValue.length - 1);
                    plus_found = true
                }
                campoAux.name = auxValue;
                campos.push(campoAux);
                numeroCampos++;
                firma = firma + auxValue;
                firmaUsuario = firmaUsuario + auxValue;
                nextToken(context);
                if (numeroCampos > 100) {
                    return langError(context, i18n_get_TagFor("compiler", "MORE 100 FIELDS"))
                }
                if (auxValue == "co") {
                    return langError(context, i18n_get_TagFor("compiler", "CO AS FIELD NAME"))
                }
                if (auxValue == "nwords") {
                    return langError(context, i18n_get_TagFor("compiler", "NW AS FIELD NAME"))
                }
            }
            if (isToken(context, "(")) {
                firma = firma + ",(";
                if (plus_found) firmaUsuario = firmaUsuario + "+(";
                else firmaUsuario = firmaUsuario + " (";
                nextToken(context);
                if (!isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")")) {
                    var campoAux = {};
                    campoAux.name = getToken(context);
                    campos.push(campoAux);
                    numeroCampos++;
                    firma = firma + getToken(context);
                    firmaUsuario = firmaUsuario + getToken(context);
                    nextToken(context)
                } else {
                    return langError(context, i18n_get_TagFor("compiler", "MISSING TOKEN ON") + "'" + context.co_cop[instruccionAux.co].signature + "'")
                }
                if (isToken(context, ")")) {
                    firma = firma + ")";
                    firmaUsuario = firmaUsuario + ")";
                    nextToken(context)
                } else {
                    return langError(context, i18n_get_TagFor("compiler", "MISSING ) ON") + "'" + context.co_cop[instruccionAux.co].signature + "'")
                }
            }
            firma = firma + ",";
            firmaUsuario = firmaUsuario + " "
        }
        firma = firma.substr(0, firma.length - 1);
        firma = firma.replace(/,,/g, ",");
        firmaUsuario = firmaUsuario.substr(0, firmaUsuario.length - 1);
        firmaUsuario = firmaUsuario.replace(/  /g, " ");
        instruccionAux.signature = firma;
        instruccionAux.signatureGlobal = firma;
        instruccionAux.signatureUser = firmaUsuario;
        instruccionAux.signatureRaw = firmaUsuario;
        nextToken(context);
        if (!isToken(context, "co")) {
            return langError(context, i18n_get_TagFor("compiler", "NO CO FIELD"))
        }
        nextToken(context);
        if (!isToken(context, "=")) {
            return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
        }
        nextToken(context);
        instruccionAux.co = getToken(context);
        if (getToken(context).match("[01]*")[0] != getToken(context) || getToken(context).length !== xr_info.ir.default_eltos.co.length) {
            return langError(context, i18n_get_TagFor("compiler", "INCORRECT CO BIN.") + "'" + getToken(context) + "'")
        }
        if (instruccionAux.co != all_ones_co) {
            if (typeof context.co_cop[instruccionAux.co] !== "undefined" && context.co_cop[instruccionAux.co].cop === null) {
                return langError(context, i18n_get_TagFor("compiler", "CO ALREADY USED") + context.co_cop[instruccionAux.co].signature)
            }
            if (typeof context.co_cop[instruccionAux.co] == "undefined") {
                context.co_cop[instruccionAux.co] = {};
                context.co_cop[instruccionAux.co].signature = instruccionAux.signature;
                context.co_cop[instruccionAux.co].cop = null
            }
        }
        nextToken(context);
        if (isToken(context, ",")) nextToken(context);
        if (isToken(context, "cop")) {
            nextToken(context);
            if (!isToken(context, "=")) {
                return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
            }
            nextToken(context);
            instruccionAux.cop = getToken(context);
            if (getToken(context).match("[01]*")[0] != getToken(context)) {
                return langError(context, i18n_get_TagFor("compiler", "INCORRECT COP BIN.") + "'" + getToken(context) + "'")
            }
            if (context.co_cop[instruccionAux.co].cop != null && typeof context.co_cop[instruccionAux.co].cop[instruccionAux.cop] != "undefined") {
                return langError(context, i18n_get_TagFor("compiler", "CO+COP ALREADY USED") + "'" + context.co_cop[instruccionAux.co].cop[instruccionAux.cop] + "'")
            }
            if (context.co_cop[instruccionAux.co].cop == null) context.co_cop[instruccionAux.co].cop = {};
            context.co_cop[instruccionAux.co].cop[instruccionAux.cop] = instruccionAux.signature;
            nextToken(context);
            if (isToken(context, ",")) {
                nextToken(context)
            }
        }
        if (!isToken(context, "nwords")) {
            return langError(context, i18n_get_TagFor("compiler", "NO NWORDS"))
        }
        nextToken(context);
        if (!isToken(context, "=")) {
            return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
        }
        nextToken(context);
        instruccionAux.nwords = getToken(context);
        nextToken(context);
        if (isToken(context, ",")) nextToken(context);
        var overlapping = {};
        for (i = 26; i <= 31; i++) {
            overlapping[i] = 1
        }
        var camposInsertados = 0;
        while (camposInsertados < numeroCampos) {
            var tmp_name = getToken(context);
            if (campos[camposInsertados].name != tmp_name) {
                return langError(context, i18n_get_TagFor("compiler", "UNEXPECTED FIELD") + "'" + tmp_name + "'. " + i18n_get_TagFor("compiler", "CHECK ORDER"))
            }
            nextToken(context);
            if (!isToken(context, "=")) {
                return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
            }
            nextToken(context);
            if (!isToken_arr(context, ["reg", "inm", "address"])) {
                return langError(context, "Incorrect type of field (reg, inm or address)")
            }
            campos[camposInsertados].type = getToken(context);
            firma = firma.replace("," + campos[camposInsertados].name, "," + campos[camposInsertados].type);
            firma = firma.replace("(" + campos[camposInsertados].name, "(" + campos[camposInsertados].type);
            firma = firma.replace(")" + campos[camposInsertados].name, ")" + campos[camposInsertados].type);
            firmaUsuario = firmaUsuario.replace(campos[camposInsertados].name, campos[camposInsertados].type);
            instruccionAux.signature = firma;
            instruccionAux.signatureUser = firmaUsuario;
            firmaGlobal = firma.replace("address", "num");
            firmaGlobal = firmaGlobal.replace("inm", "num");
            instruccionAux.signatureGlobal = firmaGlobal;
            nextToken(context);
            if (!isToken(context, "(")) {
                return langError(context, i18n_get_TagFor("compiler", "OPEN PAREN. NOT FOUND"))
            }
            nextToken(context);
            campos[camposInsertados].startbit = getToken(context);
            var start = parseInt(campos[camposInsertados].startbit);
            if (start > 32 * parseInt(instruccionAux.nwords) - 1) {
                return langError(context, i18n_get_TagFor("compiler", "STARTBIT OoR") + "'" + getToken(context) + "'")
            }
            nextToken(context);
            if (!isToken(context, ",")) {
                return langError(context, i18n_get_TagFor("compiler", "COMMA NOT FOUND"))
            }
            nextToken(context);
            campos[camposInsertados].stopbit = getToken(context);
            var stop = parseInt(campos[camposInsertados].stopbit);
            if (stop > 32 * parseInt(instruccionAux.nwords)) {
                return langError(context, i18n_get_TagFor("compiler", "STOPBIT OoR") + "'" + getToken(context) + "'")
            }
            for (i = stop; i <= start; i++) {
                if (typeof overlapping[i] != "undefined") {
                    return langError(context, i18n_get_TagFor("compiler", "OVERLAPPING FIELD") + campos[camposInsertados].name)
                }
                overlapping[i] = 1
            }
            nextToken(context);
            if (!isToken(context, ")")) {
                return langError(context, i18n_get_TagFor("compiler", "CLOSE PAREN. NOT FOUND"))
            }
            nextToken(context);
            if (campos[camposInsertados].type == "address") {
                if (getToken(context) != "abs" && getToken(context) != "rel") {
                    return langError(context, i18n_get_TagFor("compiler", "INCORRECT ADDRESSING"))
                }
                campos[camposInsertados].address_type = getToken(context);
                nextToken(context)
            }
            if (isToken(context, ",")) {
                nextToken(context)
            }
            camposInsertados++
        }
        instruccionAux.fields = campos;
        instruccionAux.help = "";
        if (isToken(context, "help")) {
            nextToken(context);
            if (!isToken(context, "=")) {
                return langError(context, i18n_get_TagFor("compiler", "EQUAL NOT FOUND"))
            }
            nextToken(context);
            instruccionAux.help = getToken(context);
            if ("STRING" != getTokenType(context)) {
                return langError(context, i18n_get_TagFor("compiler", "UNKNOWN ESCAPE CHAR") + "'" + getToken(context) + "'")
            }
            nextToken(context);
            if (isToken(context, ",")) {
                nextToken(context)
            }
        }
        instruccionAux.is_native = false;
        if (isToken(context, "native")) {
            instruccionAux["is_native"] = true;
            nextToken(context);
            if (isToken(context, ",")) nextToken(context)
        }
        if (instruccionAux["is_native"] === false && typeof instruccionAux.cop !== "undefined" && instruccionAux.cop.length !== xr_info.ir.default_eltos.cop.length) {
            return langError(context, i18n_get_TagFor("compiler", "BAD COP BIN. LEN.") + "'" + getToken(context) + "'")
        }
        ret = {};
        if (true == instruccionAux.is_native) ret = read_native(context);
        else ret = read_microprg(context);
        if (typeof ret.error != "undefined") return ret;
        instruccionAux.NATIVE = ret.NATIVE;
        instruccionAux.microcode = ret.microprograma;
        instruccionAux.microcomments = ret.microcomments;
        context.instrucciones.push(instruccionAux);
        context.contadorMC = context.contadorMC + 9;
        if (!isToken(context, "}")) {
            return langError(context, i18n_get_TagFor("compiler", "CLOSE BRACE NOT FOUND"))
        }
        nextToken(context)
    }
    if (context.stackRegister == null) {
        return langError(context, i18n_get_TagFor("compiler", "SP NOT DEFINED"))
    }
    var found = false;
    for (i = 0; i < context.instrucciones.length; i++) {
        if (context.instrucciones[i].name == "begin") {
            for (var j = 0; j < context.instrucciones[i].microcode.length; j++) {
                if (typeof context.etiquetas[j] != "undefined" && context.etiquetas[j] == "fetch") {
                    found = true
                }
            }
            if (found === false) {
                return langError(context, i18n_get_TagFor("compiler", "NO LABEL FETCH"))
            }
        }
    }
    if (found === false) {
        return langError(context, i18n_get_TagFor("compiler", "NO LABEL BEGIN"))
    }
    var ir_info = simhw_sim_ctrlStates_get();
    var ir_co_length = 6;
    if (typeof ir_info !== "undefined") {
        ir_co_length = ir_info.ir.default_eltos.co.length
    }
    var first_co = 0;
    var last_co = Math.pow(2, ir_co_length) - 1;
    var last_co_str = last_co.toString(2);
    var curr_instruction = null;
    for (i = 0; i < context.instrucciones.length; i++) {
        curr_instruction = context.instrucciones[i];
        if (curr_instruction.name === "begin" || curr_instruction.co !== last_co_str) {
            continue
        }
        var r = find_first_cocop(context, curr_instruction, first_co, last_co);
        if (r.j >= last_co) {
            return langError(context, i18n_get_TagFor("compiler", "NO CO CODES"))
        }
        first_co = parseInt(r.label_co, 2);
        curr_instruction.co = r.label_co;
        context.co_cop[r.label_co].signature = curr_instruction.signature;
        if (r.label_cop !== "") {
            curr_instruction.cop = r.label_cop;
            context.co_cop[r.label_co].cop[r.label_cop] = curr_instruction.signature;
            context.co_cop[r.label_co].withcop = true
        }
    }
    var labelsFounded = 0;
    if (context.labelsNotFound.length > 0) {
        for (i = 0; i < context.labelsNotFound.length; i++) {
            for (var j in context.etiquetas) {
                if (context.etiquetas[j] == context.labelsNotFound[i].nombre) {
                    context.instrucciones[context.labelsNotFound[i].instruction].microcode[context.labelsNotFound[i].cycle].MADDR = j;
                    labelsFounded++
                }
            }
            if (labelsFounded == 0) {
                return langError(context, i18n_get_TagFor("compiler", "NO LABEL MADDR") + context.labelsNotFound[i].nombre)
            }
            labelsFounded = 0
        }
    }
    var mk_native = "";
    for (i = 0; i < context.instrucciones.length; i++) {
        var ins = context.instrucciones[i];
        if (ins.is_native) {
            mk_native += "context.instrucciones[" + i + ']["NATIVE_JIT"] = ' + " function() {\n" + '\t var fields = simcore_native_get_fields("' + ins.signatureRaw + '");\n' + ins.NATIVE + "\n};\n "
        }
    }
    eval(mk_native);
    var fico = 0;
    var ficop = 0;
    context.cocop_hash = {};
    for (var fi in context.instrucciones) {
        if (context.instrucciones[fi].name == "begin") {
            continue
        }
        fico = context.instrucciones[fi].co;
        if (typeof context.cocop_hash[fico] == "undefined") {
            context.cocop_hash[fico] = {}
        }
        if (typeof context.instrucciones[fi].cop == "undefined") {
            context.cocop_hash[fico].withcop = false;
            context.cocop_hash[fico].i = context.instrucciones[fi]
        } else {
            ficop = context.instrucciones[fi].cop;
            context.cocop_hash[fico].withcop = true;
            context.cocop_hash[fico][ficop] = context.instrucciones[fi]
        }
    }
    context.revlabels = {};
    for (key in context.instrucciones) {
        context.revlabels[context.instrucciones[key]["mc-start"]] = context.instrucciones[key].name
    }
    ret = {};
    ret.error = null;
    ret.firmware = context.instrucciones;
    ret.labels_firm = context.etiquetas;
    ret.mp = {};
    ret.seg = {};
    ret.registers = context.registers;
    ret.pseudoInstructions = context.pseudoInstructions;
    ret.stackRegister = context.stackRegister;
    ret.cocop_hash = context.cocop_hash;
    ret.revlabels = context.revlabels;
    return ret
}

function saveFirmware(SIMWARE) {
    var file = "";
    for (i = 0; i < SIMWARE.firmware.length; i++) {
        file += SIMWARE.firmware[i].signatureRaw;
        file += " {" + "\n";
        if (typeof SIMWARE.firmware[i].co != "undefined") {
            file += "\t" + "co=" + SIMWARE.firmware[i].co + "," + "\n"
        }
        if (typeof SIMWARE.firmware[i].cop != "undefined") {
            file += "\t" + "cop=" + SIMWARE.firmware[i].cop + "," + "\n"
        }
        if (typeof SIMWARE.firmware[i].nwords != "undefined") {
            file += "\t" + "nwords=" + SIMWARE.firmware[i].nwords + "," + "\n"
        }
        if (typeof SIMWARE.firmware[i].fields != "undefined") {
            if (SIMWARE.firmware[i].fields.length > 0) {
                for (var j = 0; j < SIMWARE.firmware[i].fields.length; j++) {
                    file += "\t" + SIMWARE.firmware[i].fields[j].name + " = " + SIMWARE.firmware[i].fields[j].type;
                    file += "(" + SIMWARE.firmware[i].fields[j].startbit + "," + SIMWARE.firmware[i].fields[j].stopbit + ")";
                    if (SIMWARE.firmware[i].fields[j].type == "address") {
                        file += SIMWARE.firmware[i].fields[j].address_type
                    }
                    file += "," + "\n"
                }
            }
        }
        if (typeof SIMWARE.firmware[i].microcode != "undefined") {
            var addr = SIMWARE.firmware[i]["mc-start"];
            if (SIMWARE.firmware[i].name != "begin") {
                file += "\t" + "{"
            }
            for (var j = 0; j < SIMWARE.firmware[i].microcode.length; j++) {
                if ("" != SIMWARE.firmware[i].microcomments[j]) file += "\n\t\t# " + SIMWARE.firmware[i].microcomments[j];
                if (typeof SIMWARE.labels_firm[addr] != "undefined") file += "\n" + SIMWARE.labels_firm[addr] + ":\t";
                else file += "\n" + "\t" + "\t";
                file += "(";
                var anySignal = 0;
                for (var k in SIMWARE.firmware[i].microcode[j]) {
                    if ("MADDR" == k) {
                        var val = SIMWARE.firmware[i].microcode[j][k];
                        if (typeof SIMWARE.labels_firm[val] == "undefined") file += k + "=" + val.toString(2) + ", ";
                        else file += k + "=" + SIMWARE.labels_firm[val] + ", ";
                        continue
                    }
                    file += k + "=" + SIMWARE.firmware[i].microcode[j][k].toString(2) + ", ";
                    anySignal = 1
                }
                if (anySignal == 1) {
                    file = file.substr(0, file.length - 2)
                }
                file += "),";
                addr++
            }
            file = file.substr(0, file.length - 1);
            if (SIMWARE.firmware[i].name != "begin") {
                file += "\n\t}"
            }
        }
        file += "\n}\n\n"
    }
    if (typeof SIMWARE.registers != "undefined" && SIMWARE.registers.length > 0) {
        file += "registers" + "\n{\n";
        for (i = 0; i < SIMWARE.registers.length; i++) {
            var l = SIMWARE.registers[i].length - 1;
            var r = " [ ";
            for (j = 0; j < l; j++) r += SIMWARE.registers[i][j] + ", ";
            r += SIMWARE.registers[i][l] + " ] ";
            if (SIMWARE.stackRegister == i) file += "\t" + i + "=" + r + " (stack_pointer)," + "\n";
            else file += "\t" + i + "=" + r + "," + "\n"
        }
        file = file.substr(0, file.length - 2);
        file += "\n}\n"
    }
    if (SIMWARE.pseudoInstructions.length !== 0) {
        file += "\n" + "pseudoinstructions\n" + "{";
        for (var ie = 0; ie < SIMWARE.pseudoInstructions.length; ie++) {
            file += "\n" + "\t" + SIMWARE.pseudoInstructions[ie].initial.signature.replace(",", " ") + "\n" + "\t{\n";
            var ie_inst = SIMWARE.pseudoInstructions[ie].finish.signature.split("\n");
            for (var ie_i = 0; ie_i < ie_inst.length; ie_i++) {
                file += "\t\t" + ie_inst[ie_i].trim() + " ;\n"
            }
            file += "\t}\n"
        }
        file += "}\n"
    }
    return file
}

function decode_instruction(curr_firm, ep_ir, binstruction) {
    var ret = {
        oinstruction: null,
        op_code: 0,
        cop_code: 0
    };
    var bits = binstruction.toString(2).padStart(32, "0");
    var co = bits.substr(ep_ir.default_eltos.co.begin, ep_ir.default_eltos.co.length);
    ret.op_code = parseInt(co, 2);
    var cop = bits.substr(ep_ir.default_eltos.cop.begin, ep_ir.default_eltos.cop.length);
    ret.cop_code = parseInt(cop, 2);
    if ("undefined" == typeof curr_firm.cocop_hash[co]) {
        return ret
    }
    if (false == curr_firm.cocop_hash[co].withcop) ret.oinstruction = curr_firm.cocop_hash[co].i;
    else ret.oinstruction = curr_firm.cocop_hash[co][cop];
    return ret
}

function decode_ram() {
    var sram = "\n";
    var curr_ircfg = simhw_sim_ctrlStates_get().ir;
    var curr_firm = simhw_internalState("FIRMWARE");
    var curr_MP = simhw_internalState("MP");
    for (var address in curr_MP) {
        var value = get_value(curr_MP[address]);
        var binstruction = value.toString(2);
        binstruction = "00000000000000000000000000000000".substring(0, 32 - binstruction.length) + binstruction;
        sram += "0x" + parseInt(address).toString(16) + ":" + decode_instruction(curr_firm, curr_ircfg, binstruction).oinstruction + "\n"
    }
    return sram
}
BYTE_LENGTH = 8;
WORD_BYTES = 4;
WORD_LENGTH = WORD_BYTES * BYTE_LENGTH;
sim_segments = {
    ".kdata": {
        name: ".kdata",
        begin: 0,
        end: 255,
        color: "#FF99CC",
        kindof: "data"
    },
    ".ktext": {
        name: ".ktext",
        begin: 256,
        end: 4095,
        color: "#A9D0F5",
        kindof: "text"
    },
    ".data": {
        name: ".data",
        begin: 4096,
        end: 32767,
        color: "#FACC2E",
        kindof: "data"
    },
    ".text": {
        name: ".text",
        begin: 32768,
        end: 131071,
        color: "#BEF781",
        kindof: "text"
    },
    ".stack": {
        name: ".stack",
        begin: 131071,
        end: 1048576,
        color: "#F1F2A3",
        kindof: "stack"
    }
};
directives = {
    ".kdata": {
        name: ".kdata",
        kindof: "segment",
        size: 0
    },
    ".ktext": {
        name: ".ktext",
        kindof: "segment",
        size: 0
    },
    ".data": {
        name: ".data",
        kindof: "segment",
        size: 0
    },
    ".text": {
        name: ".text",
        kindof: "segment",
        size: 0
    },
    ".byte": {
        name: ".byte",
        kindof: "datatype",
        size: 1
    },
    ".half": {
        name: ".half",
        kindof: "datatype",
        size: 2
    },
    ".word": {
        name: ".word",
        kindof: "datatype",
        size: 4
    },
    ".float": {
        name: ".float",
        kindof: "datatype",
        size: 4
    },
    ".double": {
        name: ".double",
        kindof: "datatype",
        size: 8
    },
    ".ascii": {
        name: ".ascii",
        kindof: "datatype",
        size: 1
    },
    ".asciiz": {
        name: ".asciiz",
        kindof: "datatype",
        size: 1
    },
    ".space": {
        name: ".space",
        kindof: "datatype",
        size: 1
    },
    ".string": {
        name: ".string",
        kindof: "datatype",
        size: 1
    },
    ".zero": {
        name: ".zero",
        kindof: "datatype",
        size: 1
    },
    ".align": {
        name: ".align",
        kindof: "datatype",
        size: 0
    }
};

function get_datatype_size(datatype) {
    if (typeof directives[datatype] === "undefined") {
        console.log("ERROR: not defined datatype: " + datatype + "\n");
        return 0
    }
    return directives[datatype].size
}

function is_directive_kindof(text, kindof) {
    if (typeof directives[text] === "undefined") {
        return false
    }
    return directives[text].kindof == kindof
}

function is_directive(text) {
    return typeof directives[text] !== "undefined"
}

function is_directive_segment(text) {
    return is_directive_kindof(text, "segment")
}

function is_directive_datatype(text) {
    return is_directive_kindof(text, "datatype")
}

function isDecimal(n) {
    var ret = {
        number: 0,
        isDecimal: false
    };
    if (n.length > 1 && n[0] == "0") {
        return ret
    }
    if (typeof n === "string" && n.includes(".")) {
        return ret
    }
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
        ret.isDecimal = true;
        ret.number = parseInt(n);
        return ret
    }
    return ret
}

function isOctal(n) {
    var ret = {
        number: 0,
        isDecimal: false
    };
    if (n.substring(0, 1) == "0") {
        var octal = n.substring(1).replace(/\b0+/g, "");
        ret.number = parseInt(octal, 8);
        ret.isDecimal = ret.number.toString(8) === octal;
        return ret
    }
    return ret
}

function isHex(n) {
    var ret = {
        number: 0,
        isDecimal: false
    };
    if (n.substring(0, 2).toLowerCase() == "0x") {
        var hex = n.substring(2).toLowerCase().replace(/\b0+/g, "");
        if (hex == "") {
            hex = "0"
        }
        ret.number = parseInt(hex, 16);
        ret.isDecimal = ret.number.toString(16) === hex;
        return ret
    }
    return ret
}

function isChar(n) {
    var ret = {
        number: 0,
        isDecimal: false
    };
    var ret1 = treatControlSequences(n);
    if (true == ret1.error) {
        return ret
    }
    var possible_value = ret1.string;
    if (possible_value[0] == "'" && possible_value[2] == "'" || possible_value[0] == '"' && possible_value[2] == '"') {
        ret.number = possible_value.charCodeAt(1);
        ret.isDecimal = true;
        return ret
    }
    return ret
}

function isFloat(n) {
    var ret = {
        number: 0,
        isFloat: false
    };
    var non_float = /[a-df-zA-DF-Z]+/;
    if (non_float.test(n) === true) {
        return ret
    }
    ret.number = parseFloat(n);
    ret.isFloat = !isNaN(ret.number);
    return ret
}

function get_decimal_value(possible_value) {
    var ret = {
        number: 0,
        isDecimal: true
    };
    ret = isOctal(possible_value);
    if (ret.isDecimal === false) {
        ret = isHex(possible_value)
    }
    if (ret.isDecimal === false) {
        ret = isDecimal(possible_value)
    }
    if (ret.isDecimal === false) {
        ret = isChar(possible_value)
    }
    return ret
}

function decimal2binary(number, size) {
    var num_bits = number.toString(2);
    if (num_bits.length > WORD_LENGTH) {
        return [num_bits, size - num_bits.length]
    }
    num_bits = (number >>> 0).toString(2);
    if (number >= 0) {
        return [num_bits, size - num_bits.length]
    }
    num_bits = "1" + num_bits.replace(/^[1]+/g, "");
    if (num_bits.length > size) {
        return [num_bits, size - num_bits.length]
    }
    num_bits = "1".repeat(size - num_bits.length) + num_bits;
    return [num_bits, size - num_bits.length]
}

function float2binary(f, size) {
    var buf = new ArrayBuffer(8);
    var float = new Float32Array(buf);
    var uint = new Uint32Array(buf);
    float[0] = f;
    return decimal2binary(uint[0], size)
}

function get_inm_value(value) {
    var ret1 = {};
    var ret = {
        number: 0,
        isDecimal: false,
        isFloat: false
    };
    ret1 = get_decimal_value(value);
    if (ret1.isDecimal == true) {
        ret1.isFloat = false;
        return ret1
    }
    ret1 = isFloat(value);
    if (ret1.isFloat == true) {
        ret1.isDecimal = false;
        return ret1
    }
    return ret
}

function isValidTag(tag) {
    if (tag.trim() == "") {
        return false
    }
    var ret = isDecimal(tag[0]);
    if (ret.isDecimal == true) {
        return false
    }
    var myRegEx = /[^a-z,_\d]/i;
    return !myRegEx.test(tag)
}

function sum_array(a) {
    return a.reduce((function(a, b) {
        return a + b
    }), 0)
}

function get_candidate(advance, instruction) {
    var candidate = false;
    var candidates = {};
    var signatures = {};
    for (i = 0; i < advance.length; i++) {
        if (advance[i]) {
            candidates[i] = instruction[i].nwords;
            signatures[instruction[i].signature] = 0
        }
    }
    if (Object.keys(signatures).length === 1) {
        var min = false;
        for (var i in candidates) {
            if (min == false) {
                min = candidates[i];
                candidate = i
            } else if (min == candidates[i]) {
                candidate = false
            } else if (min > candidates[i]) {
                min = candidates[i];
                candidate = i
            }
        }
    }
    return candidate ? parseInt(candidate) : candidate
}

function reset_assembly(nwords) {
    return "0".repeat(WORD_LENGTH * nwords)
}

function assembly_replacement(machineCode, num_bits, startbit, stopbit, free_space) {
    var machineCodeAux = machineCode.substring(0, machineCode.length - startbit + free_space);
    machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length - stopbit);
    return machineCode
}

function assembly_co_cop(machineCode, co, cop) {
    var xr_info = simhw_sim_ctrlStates_get();
    if (co !== false) machineCode = assembly_replacement(machineCode, co, WORD_LENGTH, WORD_LENGTH - 6, 0);
    if (cop !== false) machineCode = assembly_replacement(machineCode, cop, xr_info.ir.default_eltos.cop.length, 0, 0);
    return machineCode
}

function writememory_and_reset(mp, gen, nwords) {
    if (gen.byteWord >= WORD_BYTES) {
        var melto = {
            value: gen.machineCode,
            source_tracking: gen.track_source,
            comments: gen.comments
        };
        main_memory_set(mp, "0x" + gen.seg_ptr.toString(16), melto);
        gen.seg_ptr = gen.seg_ptr + WORD_BYTES;
        gen.byteWord = 0;
        gen.track_source = [];
        gen.comments = [];
        gen.machineCode = reset_assembly(nwords)
    }
}

function is_end_of_file(context) {
    return "" === getToken(context) && context.t >= context.text.length
}

function read_data(context, datosCU, ret) {
    var seg_name = getToken(context);
    var gen = {};
    gen.byteWord = 0;
    gen.track_source = [];
    gen.comments = [];
    gen.machineCode = reset_assembly(1);
    gen.seg_ptr = ret.seg[seg_name].begin;
    nextToken(context);
    while (!is_directive_segment(getToken(context)) && !is_end_of_file(context)) {
        var possible_tag = "";
        while (!is_directive_datatype(getToken(context)) && !is_end_of_file(context)) {
            possible_tag = getToken(context);
            if ("TAG" != getTokenType(context)) {
                if ("" == possible_tag) {
                    possible_tag = "[empty]"
                }
                return langError(context, i18n_get_TagFor("compiler", "NO TAG OR DIRECTIVE") + "'" + possible_tag + "'")
            }
            var tag = possible_tag.substring(0, possible_tag.length - 1);
            if (!isValidTag(tag)) {
                return langError(context, i18n_get_TagFor("compiler", "INVALID TAG FORMAT") + "'" + tag + "'")
            }
            if (context.firmware[tag]) {
                return langError(context, i18n_get_TagFor("compiler", "TAG OR INSTRUCTION") + "'" + tag + "'")
            }
            if (ret.labels2[tag]) {
                return langError(context, i18n_get_TagFor("compiler", "REPEATED TAG") + "'" + tag + "'")
            }
            ret.labels2[tag] = "0x" + (gen.seg_ptr + gen.byteWord).toString(16);
            nextToken(context)
        }
        if (is_end_of_file(context)) {
            break
        }
        var possible_datatype = getToken(context);
        if (".word" == possible_datatype || ".half" == possible_datatype || ".byte" == possible_datatype || ".float" == possible_datatype || ".double" == possible_datatype) {
            var size = get_datatype_size(possible_datatype);
            nextToken(context);
            var possible_value = getToken(context);
            while (!is_directive(getToken(context)) && !is_end_of_file(context)) {
                var label_found = false;
                var ret1 = get_inm_value(possible_value);
                var number = ret1.number;
                if (ret1.isDecimal == false && ret1.isFloat == false) {
                    if (".word" !== possible_datatype) {
                        return langError(context, i18n_get_TagFor("compiler", "NO NUMERIC DATATYPE") + "'" + possible_value + "'")
                    }
                    if (!isValidTag(possible_value)) {
                        return langError(context, i18n_get_TagFor("compiler", "INVALID TAG FORMAT") + "'" + possible_value + "'")
                    }
                    if (context.firmware[possible_value]) {
                        return langError(context, i18n_get_TagFor("compiler", "TAG OR INSTRUCTION") + "'" + possible_value + "'")
                    }
                    number = 0;
                    label_found = true
                }
                if (ret1.isDecimal == true) a = decimal2binary(number, size * BYTE_LENGTH);
                else a = float2binary(number, size * BYTE_LENGTH);
                num_bits = a[0];
                free_space = a[1];
                if (free_space < 0) {
                    return langError(context, i18n_get_TagFor("compiler", "EXPECTED VALUE") + possible_datatype + "' (" + size * BYTE_LENGTH + " bits), " + i18n_get_TagFor("compiler", "BUT INSERTED") + possible_value + "' (" + num_bits.length + " bits) " + i18n_get_TagFor("compiler", "INSTEAD"))
                }
                writememory_and_reset(ret.mp, gen, 1);
                while ((gen.seg_ptr + gen.byteWord) % size != 0) {
                    gen.byteWord++;
                    writememory_and_reset(ret.mp, gen, 1)
                }
                if ("" != possible_tag) {
                    ret.labels2[possible_tag.substring(0, possible_tag.length - 1)] = "0x" + (gen.seg_ptr + gen.byteWord).toString(16);
                    possible_tag = ""
                }
                if (label_found) {
                    ret.labels["0x" + gen.seg_ptr.toString(16)] = {
                        name: possible_value,
                        addr: gen.seg_ptr,
                        startbit: 31,
                        stopbit: 0,
                        rel: undefined,
                        nwords: 1,
                        labelContext: getLabelContext(context)
                    }
                }
                gen.machineCode = assembly_replacement(gen.machineCode, num_bits, BYTE_LENGTH * (size + gen.byteWord), BYTE_LENGTH * gen.byteWord, free_space);
                gen.byteWord += size;
                gen.track_source.push(possible_value);
                nextToken(context);
                if ("," == getToken(context)) {
                    nextToken(context)
                }
                if (is_directive(getToken(context)) || "TAG" == getTokenType(context) || "." == getToken(context)[0]) {
                    break
                }
                possible_value = getToken(context)
            }
        } else if (".space" == possible_datatype || ".zero" == possible_datatype) {
            nextToken(context);
            var possible_value = getToken(context);
            var ret1 = isDecimal(possible_value);
            possible_value = ret1.number;
            if (ret1.isDecimal == false) {
                return langError(context, i18n_get_TagFor("compiler", "NO NUMBER OF BYTES") + "'" + possible_value + "'")
            }
            if (possible_value < 0) {
                return langError(context, i18n_get_TagFor("compiler", "NO POSITIVE NUMBER") + "'" + possible_value + "'")
            }
            for (i = 0; i < possible_value; i++) {
                writememory_and_reset(ret.mp, gen, 1);
                gen.byteWord++;
                if (".zero" == possible_datatype) gen.track_source.push("0x0");
                else gen.track_source.push("_")
            }
            nextToken(context)
        } else if (".align" == possible_datatype) {
            nextToken(context);
            var possible_value = getToken(context);
            var ret1 = isDecimal(possible_value);
            possible_value = ret1.number;
            if (ret1.isDecimal == false && possible_value >= 0) {
                return langError(context, i18n_get_TagFor("compiler", "INVALID ALIGN VALUE") + "'" + possible_value + "'. " + i18n_get_TagFor("compiler", "REMEMBER ALIGN VAL"))
            }
            writememory_and_reset(ret.mp, gen, 1);
            var align_offset = Math.pow(2, parseInt(possible_value));
            switch (align_offset) {
                case 1:
                    break;
                case 2:
                    if (gen.byteWord & 1 == 1) gen.byteWord++;
                    break;
                default:
                    writememory_and_reset(ret.mp, gen, 1);
                    while (gen.seg_ptr % align_offset != 0 || gen.byteWord != 0) {
                        gen.byteWord++;
                        writememory_and_reset(ret.mp, gen, 1)
                    }
            }
            nextToken(context)
        } else if (".ascii" == possible_datatype || ".asciiz" == possible_datatype || ".string" == possible_datatype) {
            nextToken(context);
            var possible_value = getToken(context);
            var ret1 = treatControlSequences(possible_value);
            if (true == ret1.error) {
                return langError(context, ret1.string)
            }
            possible_value = ret1.string;
            while (!is_directive(getToken(context)) && !is_end_of_file(context)) {
                writememory_and_reset(ret.mp, gen, 1);
                if ('"' !== possible_value[0]) {
                    return langError(context, i18n_get_TagFor("compiler", "NO QUOTATION MARKS") + "'" + possible_value + "'")
                }
                if ('"' !== possible_value[possible_value.length - 1]) {
                    return langError(context, i18n_get_TagFor("compiler", "NOT CLOSED STRING"))
                }
                if ("" == possible_value) {
                    return langError(context, i18n_get_TagFor("compiler", "NOT CLOSED STRING"))
                }
                if ("STRING" != getTokenType(context)) {
                    return langError(context, i18n_get_TagFor("compiler", "NO QUOTATION MARKS") + "'" + possible_value + "'")
                }
                for (i = 0; i < possible_value.length; i++) {
                    writememory_and_reset(ret.mp, gen, 1);
                    if (possible_value[i] == '"') {
                        continue
                    }
                    num_bits = possible_value.charCodeAt(i).toString(2);
                    gen.machineCode = assembly_replacement(gen.machineCode, num_bits, BYTE_LENGTH * (1 + gen.byteWord), BYTE_LENGTH * gen.byteWord, BYTE_LENGTH - num_bits.length);
                    gen.byteWord++;
                    gen.track_source.push(possible_value[i])
                }
                if (".asciiz" == possible_datatype || ".string" == possible_datatype) {
                    writememory_and_reset(ret.mp, gen, 1);
                    num_bits = "\0".charCodeAt(0).toString(2);
                    gen.machineCode = assembly_replacement(gen.machineCode, num_bits, BYTE_LENGTH * (1 + gen.byteWord), BYTE_LENGTH * gen.byteWord, BYTE_LENGTH - num_bits.length);
                    gen.byteWord++;
                    gen.track_source.push("0x0")
                }
                nextToken(context);
                if ("," == getToken(context)) {
                    nextToken(context)
                }
                if (is_directive(getToken(context)) || "TAG" == getTokenType(context) || "." == getToken(context)[0]) break;
                possible_value = getToken(context);
                ret1 = treatControlSequences(possible_value);
                if (true == ret1.error) {
                    return langError(context, ret1.string)
                }
                possible_value = ret1.string
            }
        } else {
            return langError(context, i18n_get_TagFor("compiler", "UNEXPECTED DATATYPE") + "'" + possible_datatype + "'")
        }
    }
    if (gen.byteWord > 0) {
        var melto = {
            value: gen.machineCode,
            source_tracking: gen.track_source,
            comments: gen.comments
        };
        main_memory_set(ret.mp, "0x" + gen.seg_ptr.toString(16), melto);
        gen.seg_ptr = gen.seg_ptr + WORD_BYTES
    }
    ret.seg[seg_name].end = gen.seg_ptr
}

function read_text(context, datosCU, ret) {
    var seg_name = getToken(context);
    var seg_ptr = ret.seg[seg_name].begin;
    var firmware = context.firmware;
    var pseudoInstructions = context.pseudoInstructions;
    var finish = [];
    var isPseudo = false;
    var pfinish = [];
    var npseudoInstructions = 0;
    var pseudo_fields = {};
    var counter = -1;
    var candidate;
    var error = "";
    var registers = {};
    for (i = 0; i < datosCU.registers.length; i++) {
        if (typeof datosCU.registers[i] === "undefined") {
            continue
        }
        for (var j = 0; j < datosCU.registers[i].length; j++) {
            registers[datosCU.registers[i][j]] = i
        }
    }
    nextToken(context);
    while (!is_directive_segment(getToken(context)) && !is_end_of_file(context)) {
        while (!isPseudo && typeof firmware[getToken(context)] === "undefined" && !is_end_of_file(context)) {
            var possible_tag = getToken(context);
            if ("TAG" != getTokenType(context)) {
                if ("" == possible_tag) {
                    possible_tag = "[empty]"
                }
                return langError(context, i18n_get_TagFor("compiler", "NO TAG, DIR OR INS") + "'" + possible_tag + "'")
            }
            var tag = possible_tag.substring(0, possible_tag.length - 1);
            if (!isValidTag(tag)) {
                return langError(context, i18n_get_TagFor("compiler", "INVALID TAG FORMAT") + "'" + tag + "'")
            }
            if (firmware[tag]) {
                return langError(context, i18n_get_TagFor("compiler", "TAG OR INSTRUCTION") + "'" + tag + "'")
            }
            if (ret.labels2[tag]) {
                return langError(context, i18n_get_TagFor("compiler", "REPEATED TAG") + "'" + tag + "'")
            }
            ret.labels2[tag] = "0x" + seg_ptr.toString(16);
            nextToken(context)
        }
        if (is_end_of_file(context)) {
            break
        }
        var instruction = null;
        if (!isPseudo) {
            finish = [];
            instruction = getToken(context)
        } else {
            instruction = pfinish[counter++]
        }
        var signature_fields = [];
        var signature_user_fields = [];
        var advance = [];
        var max_length = 0;
        var binaryAux = [];
        var firmware_instruction_length = 0;
        if (typeof firmware[instruction] !== "undefined") {
            firmware_instruction_length = firmware[instruction].length
        }
        var val = [];
        for (i = 0; i < firmware_instruction_length; i++) {
            signature_fields[i] = firmware[instruction][i].signature.split(",");
            signature_user_fields[i] = firmware[instruction][i].signatureUser.split(" ");
            signature_fields[i].shift();
            signature_user_fields[i].shift();
            advance[i] = 1;
            binaryAux[i] = [];
            max_length = Math.max(max_length, signature_fields[i].length);
            finish[i] = [];
            if (typeof pseudoInstructions[instruction] !== "function" && pseudoInstructions[instruction] && typeof firmware[instruction][i].finish !== "undefined") {
                val = firmware[instruction][i].finish.replace(/ ,/g, "").split(" ");
                val.pop();
                finish[i] = val;
                npseudoInstructions = 0
            }
        }
        var converted;
        var value;
        var s = [];
        s[0] = instruction;
        for (i = 0; i < max_length; i++) {
            if (counter == -1) {
                nextToken(context);
                if ("," == getToken(context)) {
                    nextToken(context)
                }
                value = getToken(context)
            } else {
                var aux_fields = pfinish[counter++];
                if (pseudo_fields[aux_fields]) value = pseudo_fields[aux_fields];
                else value = aux_fields
            }
            if ("TAG" != getTokenType(context) && !firmware[value]) {
                s[i + 1] = value
            }
            for (j = 0; j < advance.length; j++) {
                if (advance[j] == 0) {
                    continue
                }
                if (i >= signature_fields[j].length) {
                    if ("TAG" != getTokenType(context) && !firmware[value] && !is_end_of_file(context)) {
                        advance[j] = 0
                    }
                    continue
                }
                var field = firmware[instruction][j].fields[i];
                var size = field.startbit - field.stopbit + 1;
                var label_found = false;
                var sel_found = false;
                switch (field.type) {
                    case "address":
                    case "inm":
                        if (isPseudo && "sel" == value) {
                            counter++;
                            var start = pfinish[counter++];
                            var stop = pfinish[counter++];
                            var value = pseudo_fields[pfinish[counter++]];
                            counter++;
                            sel_found = true
                        }
                        var ret1 = get_inm_value(value);
                        converted = ret1.number;
                        if (ret1.isDecimal == false && ret1.isFloat == false) {
                            error = i18n_get_TagFor("compiler", "NO NUMERIC DATATYPE") + "'" + value + "'";
                            if (value[0] == "'") {
                                advance[j] = 0;
                                break
                            }
                            if (!isValidTag(value)) {
                                advance[j] = 0;
                                break
                            }
                            if (firmware[value]) {
                                error = i18n_get_TagFor("compiler", "TAG OR INSTRUCTION") + "'" + value + "'";
                                advance[j] = 0;
                                break
                            }
                            label_found = true
                        }
                        if (sel_found) {
                            if (ret1.isDecimal == true) res = decimal2binary(converted, WORD_LENGTH);
                            else res = float2binary(converted, WORD_LENGTH);
                            if (res[1] < 0) {
                                return langError(context, "'" + value + "' " + i18n_get_TagFor("compiler", "BIGGER THAN") + WORD_LENGTH + " " + i18n_get_TagFor("compiler", "BITS"))
                            }
                            if (label_found) {
                                s[i + 1] = value
                            } else {
                                converted = "0".repeat(res[1]) + res[0];
                                converted = converted.substring(WORD_LENGTH - start - 1, WORD_LENGTH - stop);
                                converted = parseInt(converted, 2);
                                s[i + 1] = "0x" + converted.toString(16)
                            }
                        }
                        if (!label_found) {
                            if (ret1.isDecimal == true) var res = decimal2binary(converted, size);
                            else var res = float2binary(converted, size);
                            if (field.type == "address" && "rel" == field.address_type) {
                                res = decimal2binary(converted, size)
                            }
                        }
                        break;
                    case "reg":
                        if (typeof value === "undefined") {
                            error = i18n_get_TagFor("compiler", "INS. MISSING FIELD");
                            advance[j] = 0;
                            break
                        }
                        var aux = false;
                        if (value.startsWith("(")) {
                            if ("(reg)" != signature_fields[j][i]) {
                                error = i18n_get_TagFor("compiler", "UNEXPECTED (REG)");
                                advance[j] = 0;
                                break
                            }
                            if (counter == -1) {
                                nextToken(context);
                                value = getToken(context)
                            } else {
                                value = pseudo_fields[pfinish[counter++]]
                            }
                            aux = true
                        } else {
                            if ("(reg)" == signature_fields[j][i]) {
                                error = i18n_get_TagFor("compiler", "EXPECTED (REG)") + "'" + value + "'";
                                advance[j] = 0;
                                break
                            }
                        }
                        if (typeof registers[value] === "undefined") {
                            error = i18n_get_TagFor("compiler", "EXPECTED REG") + "'" + value + "'";
                            advance[j] = 0;
                            break
                        }
                        if (aux) {
                            s[i + 1] = "(" + value + ")";
                            if (counter == -1) {
                                nextToken(context);
                                aux = getToken(context)
                            } else {
                                aux = pfinish[counter++]
                            }
                            if (")" != aux) {
                                error = i18n_get_TagFor("compiler", "CLOSE PAREN. NOT FOUND");
                                advance[j] = 0;
                                break
                            }
                        }
                        var ret1 = isDecimal(registers[value]);
                        converted = ret1.number;
                        var res = decimal2binary(converted, size);
                        value = s[i + 1];
                        break;
                    default:
                        return langError(context, i18n_get_TagFor("compiler", "UNKNOWN 1") + "'" + field.type + "'")
                }
                if (advance[j] == 1 && !label_found) {
                    if (res[1] < 0) {
                        if (field.type == "address" && "rel" == field.address_type) {
                            error = "Relative value (" + (converted - seg_ptr - WORD_BYTES) + " in decimal)" + i18n_get_TagFor("compiler", "NEEDS") + res[0].length + i18n_get_TagFor("compiler", "SPACE FOR # BITS") + size + " " + i18n_get_TagFor("compiler", "BITS")
                        } else {
                            error = "'" + value + "'" + i18n_get_TagFor("compiler", "NEEDS") + res[0].length + i18n_get_TagFor("compiler", "SPACE FOR # BITS") + size + " " + i18n_get_TagFor("compiler", "BITS")
                        }
                        advance[j] = 0
                    }
                }
                if (advance[j] == 1 && !(isPseudo && counter == -1)) {
                    binaryAux[j][i] = {
                        num_bits: label_found ? false : res[0],
                        free_space: label_found ? false : res[1],
                        startbit: field.startbit,
                        stopbit: field.stopbit,
                        rel: label_found ? field.address_type : false,
                        islabel: label_found,
                        field_name: value,
                        issel: sel_found,
                        sel_start: start,
                        sel_stop: stop
                    }
                }
            }
            if (sum_array(advance) == 0) {
                break
            }
            if ("TAG" == getTokenType(context) || firmware[value]) {
                break
            }
        }
        for (i = 0; i < advance.length; i++) {
            if (advance[i] == 1) {
                candidate = i;
                if (!isPseudo) {
                    pfinish = finish[candidate]
                }
                isPseudo = isPseudo || typeof firmware[instruction][i].finish !== "undefined";
                break
            }
        }
        var format = "";
        for (i = 0; i < firmware_instruction_length; i++) {
            if (i > 0 && i < firmware[instruction].length - 1) {
                format += ", "
            }
            if (i > 0 && i == firmware[instruction].length - 1) {
                format += " or "
            }
            format += "'" + firmware[instruction][i].signatureUser + "'"
        }
        if (format == "") {
            format = "'" + instruction + "' " + i18n_get_TagFor("compiler", "UNKNOWN MC FORMAT")
        }
        var sum_res = sum_array(advance);
        if (sum_res == 0) {
            if (advance.length === 1) {
                return langError(context, error + ". <br>" + i18n_get_TagFor("compiler", "REMEMBER I. FORMAT") + format)
            }
            return langError(context, i18n_get_TagFor("compiler", "NOT MATCH MICRO") + "<br>" + i18n_get_TagFor("compiler", "REMEMBER I. FORMAT") + format + ". " + i18n_get_TagFor("compiler", "CHECK MICROCODE"))
        }
        if (sum_res > 1) {
            candidate = get_candidate(advance, firmware[instruction]);
            if (candidate === false) {
                return langError(context, i18n_get_TagFor("compiler", "SEVERAL CANDIDATES") + format)
            }
        }
        if (isPseudo) {
            if (counter == -1) {
                var s_ori = s.join(" ");
                s_ori = s_ori.trim();
                var key = "";
                var val = "";
                pseudo_fields = {};
                for (i = 0; i < signature_fields[candidate].length; i++) {
                    key = firmware[instruction][candidate].fields[i].name;
                    val = s[i + 1];
                    if (val.startsWith("(")) val = val.substring(1, val.length);
                    if (val.endsWith(")")) val = val.substring(0, val.length - 1);
                    pseudo_fields[key] = val
                }
                counter++;
                continue
            }
            npseudoInstructions++;
            if (npseudoInstructions > 1) {
                s_ori = "&nbsp;"
            }
            if (pfinish[counter] == "\n") {
                counter++
            }
        }
        var machineCode = reset_assembly(firmware[instruction][candidate].nwords);
        machineCode = assembly_co_cop(machineCode, firmware[instruction][candidate].co, firmware[instruction][candidate].cop);
        var l_addr = "";
        for (i = 0; i < binaryAux[candidate].length; i++) {
            if (binaryAux[candidate][i].islabel) {
                l_addr = "0x" + seg_ptr.toString(16);
                ret.labels[l_addr] = {
                    name: binaryAux[candidate][i].field_name,
                    addr: seg_ptr,
                    startbit: binaryAux[candidate][i].startbit,
                    stopbit: binaryAux[candidate][i].stopbit,
                    rel: binaryAux[candidate][i].rel,
                    nwords: firmware[instruction][candidate].nwords,
                    labelContext: getLabelContext(context),
                    sel_found: binaryAux[candidate][i].issel,
                    sel_start: binaryAux[candidate][i].sel_start,
                    sel_stop: binaryAux[candidate][i].sel_stop
                }
            } else {
                machineCode = assembly_replacement(machineCode, binaryAux[candidate][i].num_bits, binaryAux[candidate][i].startbit - -1, binaryAux[candidate][i].stopbit, binaryAux[candidate][i].free_space)
            }
        }
        s_def = s[0];
        for (i = 0, j = 1; i < signature_user_fields[candidate].length; i++, j++) {
            switch (signature_user_fields[candidate][i]) {
                case "address":
                case "inm":
                case "reg":
                case "(reg)":
                    s_def = s_def + " " + s[j];
                    break;
                default:
                    s_def = s_def + " " + s[j] + s[j + 1];
                    j++
            }
        }
        if (!isPseudo) {
            var s_ori = s_def
        }
        var ref = firmware[instruction][candidate];
        var new_ref = ref;
        while (false === ref.isPseudoinstruction) {
            var new_ref = datosCU.cocop_hash[firmware[instruction][candidate].co];
            if (new_ref.withcop) new_ref = new_ref[firmware[instruction][candidate].cop];
            else new_ref = new_ref.i;
            if (typeof new_ref == "undefined") {
                ref = datosCU.cocop_hash[firmware[instruction][candidate].co];
                ref = ref.i;
                break
            }
            ref = new_ref
        }
        for (i = firmware[instruction][candidate].nwords - 1; i >= 0; i--) {
            if (i < firmware[instruction][candidate].nwords - 1) {
                s_def = ""
            }
            var acc_cmt = getComments(context);
            var melto = {
                value: machineCode.substring(i * WORD_LENGTH, (i + 1) * WORD_LENGTH),
                binary: machineCode.substring(i * WORD_LENGTH, (i + 1) * WORD_LENGTH),
                source: s_def,
                source_tracking: [s_ori],
                firm_reference: ref,
                comments: [acc_cmt],
                is_assembly: true
            };
            main_memory_set(ret.mp, "0x" + seg_ptr.toString(16), melto);
            resetComments(context);
            seg_ptr = seg_ptr + WORD_BYTES
        }
        if (isPseudo && counter == pfinish.length) {
            isPseudo = false;
            counter = -1;
            npseudoInstructions = 0
        }
        var equals_fields = true;
        for (var c = 0; c < signature_fields.length; c++) {
            if (max_length !== signature_fields[c].length) {
                equals_fields = false;
                break
            }
        }
        if (isPseudo == false && (equals_fields || getToken(context) == ")")) {
            nextToken(context)
        }
        if (context.t > context.text.length) {
            break
        }
    }
    ret.seg[seg_name].end = seg_ptr
}

function simlang_compile(text, datosCU) {
    var context = {};
    context.line = 1;
    context.error = null;
    context.i = 0;
    context.contadorMC = 0;
    context.etiquetas = {};
    context.labelsNotFound = [];
    context.instrucciones = [];
    context.co_cop = {};
    context.registers = [];
    context.text = text;
    context.tokens = [];
    context.token_types = [];
    context.t = 0;
    context.newlines = [];
    context.pseudoInstructions = [];
    context.stackRegister = null;
    context.firmware = {};
    context.comments = [];
    for (i = 0; i < datosCU.firmware.length; i++) {
        var aux = datosCU.firmware[i];
        if (typeof context.firmware[aux.name] === "undefined") {
            context.firmware[aux.name] = []
        }
        context.firmware[aux.name].push({
            name: aux.name,
            nwords: parseInt(aux.nwords),
            co: typeof aux.co !== "undefined" ? aux.co : false,
            cop: typeof aux.cop !== "undefined" ? aux.cop : false,
            fields: typeof aux.fields !== "undefined" ? aux.fields : false,
            signature: aux.signature,
            signatureUser: typeof aux.signatureUser !== "undefined" ? aux.signatureUser : aux.name,
            isPseudoinstruction: false
        })
    }
    for (i = 0; i < datosCU.pseudoInstructions.length; i++) {
        var initial = datosCU.pseudoInstructions[i].initial;
        var finish = datosCU.pseudoInstructions[i].finish;
        if (typeof context.pseudoInstructions[initial.name] === "undefined") {
            context.pseudoInstructions[initial.name] = 0;
            if (typeof context.firmware[initial.name] === "undefined") {
                context.firmware[initial.name] = []
            }
        }
        context.pseudoInstructions[initial.name]++;
        context.firmware[initial.name].push({
            name: initial.name,
            fields: typeof initial.fields !== "undefined" ? initial.fields : false,
            signature: initial.signature,
            signatureUser: initial.signature.replace(/,/g, " "),
            finish: finish.signature,
            isPseudoinstruction: true
        })
    }
    var ret = {};
    ret.seg = sim_segments;
    ret.mp = {};
    ret.labels = {};
    ret.labels2 = {};
    ret.revlabels2 = {};
    ret.revseg = [];
    data_found = false;
    text_found = false;
    nextToken(context);
    while (!is_end_of_file(context)) {
        var segname = getToken(context);
        if (typeof ret.seg[segname] === "undefined") {
            return langError(context, i18n_get_TagFor("compiler", "INVALID SEGMENT NAME") + "'" + segname + "'")
        }
        if ("data" == ret.seg[segname].kindof) {
            read_data(context, datosCU, ret);
            data_found = true
        }
        if ("text" == ret.seg[segname].kindof) {
            read_text(context, datosCU, ret);
            text_found = true
        }
        if (context.error != null) {
            ret.error = context.error;
            return ret
        }
    }
    for (i in ret.labels) {
        var value = ret.labels2[ret.labels[i].name];
        if (typeof value === "undefined") {
            setLabelContext(context, ret.labels[i].labelContext);
            return langError(context, i18n_get_TagFor("compiler", "LABEL NOT DEFINED") + "'" + ret.labels[i].name + "'")
        }
        var machineCode = "";
        var auxAddr = ret.labels[i].addr;
        for (j = 0; j < ret.labels[i].nwords; j++) {
            machineCode = main_memory_getvalue(ret.mp, "0x" + auxAddr.toString(16)) + machineCode;
            auxAddr += WORD_BYTES
        }
        var size = ret.labels[i].startbit - ret.labels[i].stopbit + 1;
        var converted;
        var ret1 = isHex(value);
        converted = ret1.number;
        if (ret1.isDecimal === true) {
            if (ret.labels[i].sel_found) {
                var valuebin = converted.toString(2);
                valuebin = simcoreui_pack(valuebin, 32);
                valuebin = valuebin.substring(WORD_LENGTH - ret.labels[i].sel_start - 1, WORD_LENGTH - ret.labels[i].sel_stop);
                converted = parseInt(valuebin, 2)
            }
            var a = decimal2binary(converted, size);
            num_bits = a[0];
            free_space = a[1];
            error = "'" + ret.labels[i].name + "'" + i18n_get_TagFor("compiler", "NEEDS") + num_bits.length + i18n_get_TagFor("compiler", "SPACE FOR # BITS") + size + " " + i18n_get_TagFor("compiler", "BITS");
            if ("rel" == ret.labels[i].rel) {
                var a = decimal2binary(converted - ret.labels[i].addr - WORD_BYTES, size);
                num_bits = a[0];
                free_space = a[1];
                error = "Relative value (" + (converted - ret.labels[i].addr - WORD_BYTES) + " in decimal)" + i18n_get_TagFor("compiler", "NEEDS") + num_bits.length + i18n_get_TagFor("compiler", "SPACE FOR # BITS") + size + " " + i18n_get_TagFor("compiler", "BITS")
            }
        } else {
            return langError(context, i18n_get_TagFor("compiler", "UNKNOWN 2"))
        }
        if (free_space < 0) {
            setLabelContext(context, ret.labels[i].labelContext);
            return langError(context, error)
        }
        machineCode = assembly_replacement(machineCode, num_bits, ret.labels[i].startbit - -1, ret.labels[i].stopbit, free_space);
        auxAddr = ret.labels[i].addr;
        for (j = ret.labels[i].nwords - 1; j >= 0; j--) {
            var melto = {
                value: machineCode.substring(j * WORD_LENGTH, (j + 1) * WORD_LENGTH),
                source_tracking: null,
                comments: null
            };
            main_memory_set(ret.mp, "0x" + auxAddr.toString(16), melto);
            auxAddr += WORD_BYTES
        }
    }
    if (text_found) {
        if (typeof ret.labels2["main"] === "undefined" && typeof ret.labels2["kmain"] === "undefined") {
            return langError(context, i18n_get_TagFor("compiler", "NO MAIN OR KMAIN"))
        }
    }
    for (var key in ret.labels2) {
        ret.revlabels2[ret.labels2[key]] = key
    }
    for (var skey in ret.seg) {
        ret.revseg.push({
            begin: parseInt(ret.seg[skey].begin),
            name: skey
        })
    }
    return ret
}