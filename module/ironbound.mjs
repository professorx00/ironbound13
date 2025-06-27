// Import document classes.
import { IronboundActor } from './documents/actor.mjs';
import { IronboundItem } from './documents/item.mjs';
// Import sheet classes.
import { IronboundActorSheet } from './sheets/actor-sheet.mjs';
import { IronboundItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { IRONBOUND } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

// Add key classes to the global scope so they can be more easily used
// by downstream developers
globalThis.ironbound = {
  documents: {
    IronboundActor,
    IronboundItem,
  },
  applications: {
    IronboundActorSheet,
    IronboundItemSheet,
  },
  utils: {
    rollItemMacro,
  },
  models,
};

Hooks.once('init', function () {
  // Add custom constants for configuration.
  CONFIG.IRONBOUND = IRONBOUND;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = IronboundActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.IronboundCharacter,
    npc: models.IronboundNPC,
  };
  CONFIG.Item.documentClass = IronboundItem;
  CONFIG.Item.dataModels = {
    gear: models.IronboundGear,
    classAbility: models.IronboundClassAbility,
    speciesAbility: models.IronboundSpeciesAbility,
    npcAbility: models.IronboundNPCAbility,
    bbs: models.IronboundBBS,
    characterClass: models.IronboundCharacterClass,
    consumable: models.IronboundConsumable,
    def: models.IronboundDef,
    faction: models.IronboundFaction,
    feats: models.IronboundFeat,
    fighting: models.IronboundFighting,
    flaw: models.IronboundFlaw,
    magical: models.IronboundMagical,
    npcAttacks: models.IronboundNPCAttack,
    potion: models.IronboundPotion,
    scroll: models.IronboundScroll,
    species: models.IronboundSpecies,
    wand: models.IronboundWand,
    weapons: models.IronboundWeapon
  };

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;
  const Items = foundry.documents.collections.Items;
  const Actors = foundry.documents.collections.Actors;
  // Register sheet application classes
  Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  Actors.registerSheet('ironbound', IronboundActorSheet, {
    makeDefault: true,
    label: 'IRONBOUND.SheetLabels.Actor',
  });
  Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  Items.registerSheet('ironbound', IronboundItemSheet, {
    makeDefault: true,
    label: 'IRONBOUND.SheetLabels.Item',
  });
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

//Gets the Pool type based on Value
Handlebars.registerHelper("getPoolType", function (str) {
  let pools = {
    a: "None",
    b: "Arcane",
    c: "Mental",
    d: "Physical",
    e: "Any",
  };
  return pools[str]
});

Handlebars.registerHelper("isPassive", function (bool) {
  console.log(bool)
  return !bool
})

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createDocMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createDocMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.ironbound.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'ironbound.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
