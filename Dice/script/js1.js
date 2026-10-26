(function () {
	"use strict";
	var $ = function (id) { return document.getElementById(id); };
	var KEY = "diceDuelState";

	var state = { s1: 0, s2: 0, p1: 0, p2: 0, rounds: 0, draws: 0,
		streakWho: 0, streakLen: 0, best: 0, log: [], target: 5, dark: false, sound: true };
	var rolling = false, over = false;

	function load() {
		try { var d = JSON.parse(localStorage.getItem(KEY)); if (d) Object.keys(state).forEach(function (k) { if (k in d) state[k] = d[k]; }); } catch (e) {}
		try { var n = JSON.parse(localStorage.getItem(KEY + "Names")); if (n) { $("name1").value = n[0]; $("name2").value = n[1]; } } catch (e) {}
	}
	function save() {
		try {
			localStorage.setItem(KEY, JSON.stringify(state));
			localStorage.setItem(KEY + "Names", JSON.stringify([$("name1").value, $("name2").value]));
		} catch (e) {}
	}

	function name(i) { return $("name" + i).value.trim() || "Player " + i; }
	function rand() { return Math.floor(Math.random() * 6) + 1; }

	// tiny WebAudio blips, no audio files needed
	var ctx;
	function beep(freq, dur, type) {
		if (!state.sound) return;
		try {
			ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
			var o = ctx.createOscillator(), g = ctx.createGain();
			o.type = type || "square"; o.frequency.value = freq;
			g.gain.value = 0.04; g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
			o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur);
		} catch (e) {}
	}

	function render() {
		$("score1").textContent = state.s1;
		$("score2").textContent = state.s2;
		$("pips1").textContent = state.p1;
		$("pips2").textContent = state.p2;
		$("rounds").textContent = state.rounds;
		$("draws").textContent = state.draws;
		$("best").textContent = state.best;
		$("streak").textContent = state.streakLen ? name(state.streakWho) + " ×" + state.streakLen : "–";
		$("targetLabel").textContent = state.target;
		$("target").value = String(state.target);
		$("sound").checked = state.sound;
		$("theme").checked = state.dark;
		document.body.classList.toggle("dark", state.dark);

		var log = $("log");
		log.innerHTML = "";
		if (!state.log.length) { log.innerHTML = '<li class="empty">No rolls yet.</li>'; return; }
		state.log.forEach(function (r) {
			var li = document.createElement("li");
			var left = document.createElement("span");
			left.textContent = "#" + r.n + "  " + r.a + " vs " + r.b;
			var right = document.createElement("span");
			right.className = r.w ? "tag-win" : "tag-draw";
			right.textContent = r.w ? r.wn + " wins" : "Draw";
			li.appendChild(left); li.appendChild(right); log.appendChild(li);
		});
	}

	function setHeader(t) { $("status").textContent = t; }

	function roll() {
		if (rolling || over) return;
		rolling = true;
		$("rollBtn").disabled = true;
		$("card1").className = $("card2").className = "player";
		var d1 = $("die1"), d2 = $("die2");
		d1.classList.add("rolling"); d2.classList.add("rolling");
		setHeader("Rolling…");

		var ticks = 0;
		var timer = setInterval(function () {
			d1.src = "images/" + rand() + ".png";
			d2.src = "images/" + rand() + ".png";
			beep(300 + Math.random() * 300, 0.05);
			if (++ticks >= 9) { clearInterval(timer); finish(); }
		}, 80);
	}

	function finish() {
		var a = rand(), b = rand();
		var d1 = $("die1"), d2 = $("die2");
		d1.src = "images/" + a + ".png"; d2.src = "images/" + b + ".png";
		d1.classList.remove("rolling"); d2.classList.remove("rolling");

		state.rounds++; state.p1 += a; state.p2 += b;
		state.best = Math.max(state.best, a + b);
		var w = a > b ? 1 : b > a ? 2 : 0;
		if (w === 0) {
			state.draws++; state.streakLen = 0; state.streakWho = 0;
			setHeader("Match Draw");
			beep(260, 0.2, "triangle");
		} else {
			if (w === 1) state.s1++; else state.s2++;
			state.streakLen = (state.streakWho === w) ? state.streakLen + 1 : 1;
			state.streakWho = w;
			setHeader(name(w) + " Wins the Round");
			$("card" + w).classList.add("winner");
			$("card" + (3 - w)).classList.add("loser");
			beep(660, 0.15, "triangle"); setTimeout(function () { beep(880, 0.2, "triangle"); }, 130);
		}
		state.log.unshift({ n: state.rounds, a: a, b: b, w: w, wn: w ? name(w) : "" });
		if (state.log.length > 50) state.log.pop();

		rolling = false;
		render(); save();

		if (state.s1 >= state.target || state.s2 >= state.target) {
			endGame(state.s1 >= state.target ? 1 : 2);
		} else {
			$("rollBtn").disabled = false;
		}
	}

	function endGame(w) {
		over = true;
		$("winnerText").textContent = name(w) + " wins the match!";
		$("winnerSub").textContent = state.s1 + " – " + state.s2 + " after " + state.rounds + " rounds";
		$("modal").hidden = false;
		[523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { beep(f, 0.25, "triangle"); }, i * 140); });
		$("againBtn").focus();
	}

	function reset(keepSettings) {
		var t = state.target, dk = state.dark, sn = state.sound;
		state = { s1: 0, s2: 0, p1: 0, p2: 0, rounds: 0, draws: 0, streakWho: 0, streakLen: 0, best: 0, log: [], target: t, dark: dk, sound: sn };
		over = false; rolling = false;
		$("modal").hidden = true;
		$("rollBtn").disabled = false;
		$("card1").className = $("card2").className = "player";
		$("die1").src = $("die2").src = "images/1.png";
		setHeader("Ready to roll?");
		render(); save();
	}

	document.addEventListener("DOMContentLoaded", function () {
		load();
		render();
		if (state.s1 >= state.target || state.s2 >= state.target) { over = true; $("rollBtn").disabled = true; endGame(state.s1 >= state.target ? 1 : 2); }
		$("rollBtn").addEventListener("click", roll);
		$("resetBtn").addEventListener("click", reset);
		$("againBtn").addEventListener("click", reset);
		$("target").addEventListener("change", function (e) { state.target = +e.target.value; reset(); });
		$("sound").addEventListener("change", function (e) { state.sound = e.target.checked; save(); });
		$("theme").addEventListener("change", function (e) { state.dark = e.target.checked; render(); save(); });
		$("name1").addEventListener("input", save);
		$("name2").addEventListener("input", save);
		document.addEventListener("keydown", function (e) {
			var tag = (e.target.tagName || "").toLowerCase();
			if (e.code === "Space" && tag !== "input" && tag !== "select" && tag !== "button") { e.preventDefault(); roll(); }
		});
	});
})();
