let taEvent 					= []


Date.prototype.setCopieDe = function(dDate) {
  this.setTime(dDate.getTime())
}

Date.prototype.setDernierJourDuMois = function() {
  this.setMonth(this.getMonth() + 1)
  this.setDate(0)
}

Date.prototype.setPremierJourDeLaSemaine = function() {
  let nJourEnMoins = 0

  nJourEnMoins = this.getDay() - 1
  if (nJourEnMoins < 0) {
    nJourEnMoins = 6
  }

  this.setDate(this.getDate() - nJourEnMoins)
}

Date.prototype.setDernierJourDeLaSemaine = function() {
  this.setPremierJourDeLaSemaine()
  this.setDate(this.getDate() + 6)
}

Date.prototype.setAAAAMMJJ = function(sDate) {
  const nAnnee = parseInt(sDate.slice(0, 4))
  const nMois = parseInt(sDate.slice(4, 6)) - 1
  const nJour = parseInt(sDate.slice(6, 8))

  this.setDate(1)
  this.setFullYear(nAnnee)
  this.setMonth(nMois)
  this.setDate(nJour)
	this.setHours(0, 0, 0, 0)
}

Date.prototype.getAAAAMMJJ = function() {
  let sMois = ""
  let sJour = ""

  sMois = this.getMonth() + 1
  sMois = sMois.toString()
  if (sMois.length == 1) {
    sMois = "0" + sMois
  }
  sJour = this.getDate()
  sJour = sJour.toString()
  if (sJour.length == 1) {
    sJour = "0" + sJour
  }

  return (this.getFullYear() + sMois + sJour)
}

Date.prototype.setAjouteUnJour = function() {
  this.setDate(this.getDate() + 1)
}

Date.prototype.getInitialeJour = function() {
  const tabInitiale = ["D", "L", "M", "M", "J", "V", "S"]

  return tabInitiale[this.getDay()]
}

Date.prototype.getMoisEnLettre = function() {
  const tabMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  return tabMois[this.getMonth()]
}


jsAfficheModal = function(sCleEvent = "") {
	let objModal			= {}
	let sHtml 				= ""
	let sHtmlLien			= ""
	
	
	if (taEvent[sCleEvent].sLien != "") {
		sHtmlLien	= `<br/><a href="${taEvent[sCleEvent].sLien}">En savoir plus...</a>`
	}
	
	sHtml		= `
		<p>${taEvent[sCleEvent].sType}</p>
		<p>${taEvent[sCleEvent].sPlace}</p>
		${sHtmlLien}
	`
	
	document.getElementById("i-agd-modal-info").innerHTML	= sHtml
	document.getElementById("i-agd-modal-icon").style.color	= taEvent[sCleEvent].sCouleur
	
	objModal			= document.getElementById("i-agd-modal")
	objModal.style.display = "block";
	
	window.onclick = function(event) {
		if (event.target == objModal) {
			objModal.style.display = "none";
		}
	}
}



jsConstruitAgenda = function(sListeEvent = "") {
  let dJour							= new Date()
  let dFin 							= new Date()
	let dAujourdhui 			= new Date()
  let sHtml 						= ""
  let sHtmlNumJour 			= ""
  let sHtmlEvent 				= ""
  let nPremierMois			= 0
	let nMoisEnCours			= 0
  const tabInitialeJour = ["L", "M", "M", "J", "V", "S", "D"]
	let sCleEnCours				= ""
	let moWidthEvent			= 0
	let sLibEvent					= ""
	let sTitleEvent				= ""
	let sCouleurEvent			= ""
	let sFinPrec					= ""
	let sMomentFinPrec		= ""
	let sClassDeb					= ""
	let sClassNumJour 		= ""
	let sClassInvisible		= ""
	let sNumJour 					= ""


	dJour.setHours(0, 0, 0, 0)
	dAujourdhui.setHours(0, 0, 0, 0)

  	if (sListeEvent != "") {
    		const tabLigne = sListeEvent.split("\n")

    for (let nLigne = 0; nLigne < tabLigne.length; nLigne++) {
      if (tabLigne[nLigne] != "") {
        const tabElem = tabLigne[nLigne].split(";")
        let dJourEvt	= new Date()
				let dDebutEvt	= new Date()
        let dFinEvt		= new Date()
				let sCle			= ""
				let nNumEvent	= 0

        dDebutEvt.setAAAAMMJJ(tabElem[0])
        dFinEvt.setAAAAMMJJ(tabElem[2])

				sCle	= dDebutEvt.getAAAAMMJJ()
        if (taEvent[sCle] === undefined) {
          taEvent[sCle] = {
            nNbEvent: 1,
						dDebut: dDebutEvt,
						dFin: dFinEvt,
						sMomentDeb: tabElem[1],
						sMomentFin: tabElem[3],
						sType: tabElem[4],
		  			sPlace: tabElem[5],
						sCouleur: tabElem[6],
						sLien: tabElem[7],
						taJour: []
          }			
					
					if (taEvent[sCle].sLien == undefined) {
						taEvent[sCle].sLien		= ""
					}
					
					switch (taEvent[sCle].sType) {
						case "GITE"	:
							taEvent[sCle].sType	= "Réservé"
							taEvent[sCle].sPlace	= "Gîte occupé"
							taEvent[sCle].sCouleur	= "#b57e92"
							break
						case "VITALITE"	:
							taEvent[sCle].sType	= "Cure de vitalité"
							taEvent[sCle].sCouleur	= "#a6a155"
							break
						case "JEUNE"	:
							taEvent[sCle].sType	= "Cure de jeûne"
							taEvent[sCle].sCouleur	= "#a6a155"
							break
						case "BLOQUE"	:
							taEvent[sCle].sType	= "Bloqué"
							taEvent[sCle].sCouleur	= "#999999"
							break
					}
					if (taEvent[sCle].sCouleur == undefined)
					{
						taEvent[sCle].sCouleur	= "#666666"
					}
					
        } else {
          taEvent[sCle].nNbEvent++
        }

				
				dJourEvt.setCopieDe(dDebutEvt)
        while (dJourEvt.getTime() <= dFinEvt.getTime()) {
					taEvent[sCle].taJour[dJourEvt.getAAAAMMJJ()]	= true

          dJourEvt.setAjouteUnJour()
        }
      }
    }
  }


  nPremierMois = dJour.getMonth()
	nPremierMois--
	if (nPremierMois == -1) {
		nPremierMois	= 11
	}
	
  for (let nNumMois = nPremierMois; nNumMois < (nPremierMois + 12); nNumMois++) {

    nMoisEnCours = nNumMois

    dJour.setDate(1)
		if (nMoisEnCours > 11) {
      nMoisEnCours = nMoisEnCours - 12
    }
    dJour.setMonth(nMoisEnCours)

		sClassInvisible	= ""
		if (nNumMois == nPremierMois) {
			sClassInvisible	= " c-agd-invisible"
		}
    sHtml += `<div class="c-agd-mois${sClassInvisible}">${dJour.getMoisEnLettre()} ${dJour.getFullYear()}</div>`
    sHtml += `<div class="c-agd-semaine c-initiale${sClassInvisible}">`
    for (let nJour = 0; nJour < 7; nJour++) {
      sHtml += `<div class="c-agd-jour c-initiale">
										${tabInitialeJour[nJour]}
								</div>`
    }
    sHtml += `</div>`


    dFin.setCopieDe(dJour)
    dFin.setDernierJourDuMois()
    dFin.setDernierJourDeLaSemaine()
    dJour.setPremierJourDeLaSemaine()


    while (dJour.getTime() <= dFin.getTime()) {
			const sCleJour	= dJour.getAAAAMMJJ()
			
      if (dJour.getDay() == 1) {
        sHtmlNumJour = `<div class="c-agd-semaine c-numero${sClassInvisible}">`
        sHtmlEvent = `<div class="c-agd-semaine c-event${sClassInvisible}">`
      }

      sNumJour = ""
			sClassNumJour	= ""

      if (nMoisEnCours == dJour.getMonth()) {
        // le numéro du jour
				sNumJour = dJour.getDate()
        if (dJour.getTime() < dAujourdhui.getTime()) {
          sClassNumJour	= " c-passe"
        }

        // Les évènements
				if (sCleEnCours != "") {
					if (taEvent[sCleEnCours].dFin.getTime() == dJour.getTime()) {
						if (taEvent[sCleEnCours].sMomentFin == "A") {
							moWidthEvent	+= 14.2857142857
						} else {
							moWidthEvent	+= 7.14285714285
						}
						sHtmlEvent 			+= `<div class="c-agd-event c-fin${sClassDeb}" onclick="jsAfficheModal(${sCleEnCours});" style="width: ${moWidthEvent}%; background: ${sCouleurEvent};" title="${sTitleEvent}"><div class="c-agd-libevent">${sLibEvent}</div></div>`
						sFinPrec				= taEvent[sCleEnCours].dFin.getAAAAMMJJ()
						sMomentFinPrec	= taEvent[sCleEnCours].sMomentFin
						sCleEnCours			= ""
						sLibEvent				= ""
						sCouleurEvent		= ""
						moWidthEvent		= 0
					}
				}
				

				if (taEvent[sCleJour] != undefined) {
					sCleEnCours 		= sCleJour
					sLibEvent				= taEvent[sCleEnCours].sType
					sTitleEvent			= sLibEvent
					if (taEvent[sCleEnCours].sPlace != "") {
					    	if (taEvent[sCleEnCours].sPlace == "0") {
							sLibEvent			+= `<br><span>complet</span>`
							sTitleEvent		+= `\r\ncomplet`
						} else {
							if (parseInt(taEvent[sCleEnCours].sPlace) > 0) {
								sLibEvent			+= `<br><span>${taEvent[sCleEnCours].sPlace} place(s) restante(s)</span>`
								sTitleEvent		+= `\r\n${taEvent[sCleEnCours].sPlace} place(s) restante(s)`
							} else {
								sLibEvent			+= `<br><span>${taEvent[sCleEnCours].sPlace}</span>`
								sTitleEvent		+= `\r\n${taEvent[sCleEnCours].sPlace}`
							}
						}
					    }
					sCouleurEvent		= taEvent[sCleEnCours].sCouleur
					sClassDeb				= " c-debut"
					if (taEvent[sCleEnCours].dFin.getTime() != dJour.getTime()) {
						if (taEvent[sCleEnCours].sMomentDeb == "M") {
							moWidthEvent	+= 14.2857142857
						} else {
							if (sFinPrec != taEvent[sCleEnCours].dDebut.getAAAAMMJJ()) {
								sHtmlEvent 	+= `<div class="c-agd-event c-demi-vide"></div>`
							}
							moWidthEvent	+= 7.14285714285
						}
					}
					
					if (taEvent[sCleEnCours].dFin.getTime() == dJour.getTime()) {
						if (taEvent[sCleEnCours].sMomentFin == "A") {
							moWidthEvent	+= 14.2857142857
						} else {
							moWidthEvent	+= 7.14285714285
						}
						sHtmlEvent 			+= `<div class="c-agd-event c-fin${sClassDeb}" onclick="jsAfficheModal(${sCleEnCours});" style="width: ${moWidthEvent}%; background: ${sCouleurEvent};" title="${sTitleEvent}"><div class="c-agd-libevent">${sLibEvent}</div></div>`
						sFinPrec				= taEvent[sCleEnCours].dFin.getAAAAMMJJ()
						sMomentFinPrec	= taEvent[sCleEnCours].sMomentFin
						sCleEnCours			= ""
						sLibEvent				= ""
						sCouleurEvent		= ""
						moWidthEvent		= 0
					}
					
				} else {
						if (sCleEnCours == "") {
							if (sFinPrec == dJour.getAAAAMMJJ()) {
								if (sMomentFinPrec == "M") {
									sHtmlEvent 	+= `<div class="c-agd-event c-demi-vide"></div>`
								} 
							} else {
								sHtmlEvent 	+= `<div class="c-agd-event c-vide"></div>`
							}
						} else {
							moWidthEvent	+= 14.2857142857
						}
				}
				
      } else {
				if (sCleEnCours != "" && moWidthEvent != 0) {
          sHtmlEvent += `<div class="c-agd-event${sClassDeb}" onclick="jsAfficheModal(${sCleEnCours});" style="width: ${moWidthEvent}%; background: ${sCouleurEvent};" title="${sTitleEvent}"><div class="c-agd-libevent">${sLibEvent}</div></div>`
          moWidthEvent	= 0
          sLibEvent			= ""
          sClassDeb 		= ""
        }
        sHtmlEvent 			+= `<div class="c-agd-event c-vide"></div>`
      }

			sHtmlNumJour += `<div class="c-agd-jour c-numero${sClassNumJour}">${sNumJour}</div>`

      if (dJour.getDay() == 0) {
        sHtmlNumJour		+= `</div>`
				
				if (sCleEnCours != "" && moWidthEvent != 0) {
					sHtmlEvent 		+= `<div class="c-agd-event${sClassDeb}" onclick="jsAfficheModal(${sCleEnCours});" style="width: ${moWidthEvent}%; background: ${sCouleurEvent};" title="${sTitleEvent}"><div class="c-agd-libevent">${sLibEvent}</div></div>`
					moWidthEvent	= 0
					sLibEvent			= ""
					sClassDeb			= ""
				}
				sHtmlEvent			+= `</div>`
      	
				sHtml						+= `${sHtmlNumJour}${sHtmlEvent}`
      }

      dJour.setAjouteUnJour()
    }
  }

	
	sHtml		+= `
		<div id="i-agd-modal">
			<div id="i-agd-modal-content">
				<span id="i-agd-modal-btn-close" onclick="document.getElementById('i-agd-modal').style.display = 'none';">&times;</span>
				<div id="i-agd-modal-icon" class="material-icons">
					event_note
				</div>
				<div id=i-agd-modal-info>
				</div>
			</div>
		</div>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		`
	
  return sHtml

}

