import IronboundItemBase from './base-item.mjs';

export default class IronboundNPCAbility extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "IRONBOUND.Item.Abilities",
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.ap = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.hasBoon = new fields.BooleanField({ initial: false });
    schema.passive = new fields.BooleanField({ initial: false });
    
    schema.poolCost = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolCostType = new fields.StringField({ initial: "a" });
    schema.poolBonus = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolBonusType = new fields.StringField({ initial: "a" });
    schema.abilityBonusType = new fields.StringField({ initial: "a" });
    schema.healingFormula = new fields.StringField({
      initial: "1d6",
    });
    schema.healingType = new fields.StringField({ initial: "a" });
    schema.damageFormula = new fields.StringField({
      initial: "1d6",
    });
    schema.damageType = new fields.StringField({ initial: "a" });

    return schema;
  }
}
